import { ServiceLists } from '../../../shared/constants/constant'
import MainButton from '../../../shared/components/MainButton'
import { useState, useEffect } from 'react'

const Hero = () => {

   const [indexOfService, setIndexOfService] = useState(0);

   useEffect(() =>{
      const interval = setTimeout(() => {
         setIndexOfService((indexOfService + 1) % ServiceLists.length);
      }, 2000)

      return () => clearInterval(interval)
   }, [indexOfService])

   return (
      <section className='w-full h-screen flex justify-center relative'>
         <div className='bg-container w-[100vw] h-dvh absolute z-0 top-0 left-0'>
            <img src="/images/bg-hero.jpg" alt="Hero" className='w-full h-full object-cover mask-t-from-80% mask-b-from-50% brightness-50'/>
         </div>

         <div className='w-full max-w-[1536px] h-dvh grid grid-cols-1 sm:grid-cols-2 relative z-1'>
            <div
               className={`
               w-full h-full flex flex-col justify-between items-start 
               p-[min(10vw,60px)] lg:pt-65 sm:pt-60 pt-55`}>
                  <h2 className='text-[clamp(20px,5vw,60px)] font-inter text-white'>Animal Clinic</h2>

                  <ul className='hidden w-full sm:flex flex-col gap-5 font-inter font-extralight'>
                     {ServiceLists.map((service, index) => (
                        <li key={index} className={`text-2xl text-white z-1 ${indexOfService === index ? 'scale-150 font-bold opacity-100' : 'opacity-50'} ease-in-out duration-500 origin-left`}>{service.name}</li>
                     ))}
                  </ul>
            </div>

            <div className='w-full h-full flex flex-col justify-end items-center p-[min(10vw,60px)]'>
               <p className='text-[clamp(20px,5vw,60px)] mb-[clamp(20px,5vw,60px)] text-center sm:text-right font-inter sm:font-semibold font-extralight text-[var(--text-color)]'>Cuz They're More Than Just Pets</p>
               <MainButton label='GET PET CARE'/>
            </div>
         </div>

         <div
            onClick={() => window.scrollTo(0, 300)}
            className='z-1 absolute bottom-10 right-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer'>
               <svg className="animate-pulse w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
               </svg>
               <p className='text-sm text-[var(--text-color)]'>Scroll</p>
         </div>
      </section>
   )
}

export default Hero