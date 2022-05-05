import { BsShieldFillCheck } from "react-icons/bs"
import { BiSearchAlt } from "react-icons/bi"
import { RiHeart2Fill } from "react-icons/ri"
import { Component, FC } from "react"

type Props = {
  color: string
  title: string
  subtitle: string
  icon: any
}

const ServiceCard:FC<Props> = ({color,icon, subtitle, title}) => {
  return (
    <div className="flex flex-row justify-start items-center 
    white-glassmorphism p-3 m-2
    cursor-pointer hover:shadow-xl"
    >
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  )
}

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col justify-between md:p-20 my-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex-col justify-start items-center">
        <ServiceCard 
          color="bg-[#2952e3]"
          title="Security Guaranteed"
          subtitle="Security is guaranteed. We always maintain privacy and quality of out products"
          icon={<BsShieldFillCheck 
            fontSize={21}
            className="text-white"
            
          />}
        />
        <ServiceCard 
          color="bg-[#8945f8]"
          title="Best exchange rates"
          subtitle="Security is guaranteed. We always maintain privacy and quality of out products"
          icon={<BiSearchAlt 
            fontSize={21}
            className="text-white"
            
          />}
        />
        <ServiceCard 
          color="bg-[#f84550]"
          title="Fastest transactions"
          subtitle="Security is guaranteed. We always maintain privacy and quality of out products"
          icon={<RiHeart2Fill 
            fontSize={21}
            className="text-white"
            
          />}
        />
      </div>
    </div>
  )
}

export default Services