import { ethers } from "ethers";
import { createContext, FC, FormEvent, useEffect, useState } from "react";
import { Transaction } from "../components/Transactions";
import { contractAbi, contractAddress } from "../utils/constants";

const { ethereum } = window as (Window & typeof globalThis & { ethereum: any })

type FormData = {
    addressTo?: string;
    amount?: string;
    keyword?: string;
    message?: string;
}

type TContext = {
    connectWallet: (val?: any) => any
    currentAccount?: string,
    handleChange?: (e: FormEvent<HTMLInputElement>) => void
    formData: FormData
    setFormData?: React.Dispatch<React.SetStateAction<FormData>>
    sendTransaction?: () => Promise<void>
    transactions: Transaction[]
    loading: boolean
}

const TransactionContext = createContext<TContext>({
    connectWallet: () => { },
    formData: {},
    transactions: [],
    loading: false
})

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer)

    return transactionContract
}


const TransactionProvider: FC<any> = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.transactionCount || 0)
    const [formData, setFormData] = useState<FormData>({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    })
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const transactionContract = getEthereumContract()
            const transactions = await transactionContract.getAllTransactions()

            const structuredTransaction = transactions.map((transaction: any) => {
                return {
                    addressTo: transaction.reciever,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }
            })
            
            setTransactions(structuredTransaction)
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions()
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }
    const checkIfTransactionExists = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const transactionContract = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount();
            localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask")
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum object")
        }
    }

    const sendTransaction =async () => {
        try {
            if (!ethereum) return alert("Please install metamask")

            const { addressTo,amount,keyword, message} = formData
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount!)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 gwei,
                        value: parsedAmount._hex,
                    }
                ]
            }
            )
            
            setFormData({})
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            setLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setLoading(false)
            console.log(`Loading - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();
            localStorage.setItem('transactionCount', transactionCount.toNumber())
            setTransactionCount(transactionCount.toNumber())
            
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionExists()
    }, [])

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            handleChange,
            setFormData,
            sendTransaction,
            transactions,
            loading
        }}>
            {children}
        </TransactionContext.Provider>
    )
}

export {
    TransactionContext,
    TransactionProvider
}
