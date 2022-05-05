import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from 'react-icons/ai'
import logo from '../../images/logo.png'
import { FC, useState } from "react";

type Props = {
  classProps: string
  title: string
}

const NavbarItem: FC<Props> = ({ classProps, title }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>
    {title}
  </li>
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const items = ["Market", "Exchange", "Tutorials", "Wallets"]
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="" className="w-32 cursor-pointer" />
      </div>
      <ul
        className="text-white md:flex list-none hidden flex-row justify-between items-center flex-initial">
        { 
          items.map(item => <NavbarItem key={item} classProps="" title={item} />)
        }
        <li className="rounded-full bg-[#2952e3] py-2 px-7 cursor-pointer hover:bg-[#2546bd]">Login</li>
      </ul>
      <div className="flex relative ">
        {
          open ? <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setOpen(!open)} /> :
            <HiMenuAlt4 fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setOpen(!open)}
            />
        }
        {
          open && (
            <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] 
            h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end 
            rounded-md blue-glassmorphism text-white 
            animate-slide-in 
            ">
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setOpen(!open)} />
              </li>
              {
                  items.map(item => <NavbarItem key={item} classProps="mi-2 text-lg" title={item} />)
                }
                    </ul>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar