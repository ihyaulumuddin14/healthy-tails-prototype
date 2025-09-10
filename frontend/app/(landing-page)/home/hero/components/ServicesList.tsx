'use client'

import { serviceLists } from '@/app/constant'
import { useEffect, useState } from 'react'


export default function ServicesList() {
   const [indexOfService, setIndexOfService] = useState(0)

   useEffect(() =>{
      const interval = setInterval(() => {
         setIndexOfService((indexOfService + 1) % serviceLists.length)
      }, 2000)

      return () => clearInterval(interval)
   }, [indexOfService])

   return (
      <ul className='hidden w-full sm:flex flex-col gap-5 font-inter font-extralight'>
         {serviceLists.map((service, index) => (
            <li key={index} className={`text-xl ${indexOfService === index ? "scale-150" : ""} text-white z-1 ease-in-out duration-500 origin-left`}>
               {service.name}
            </li>
         ))}
      </ul>
   )
}
