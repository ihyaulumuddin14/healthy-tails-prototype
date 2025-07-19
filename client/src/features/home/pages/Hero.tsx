import { serviceLists } from '../../../shared/constants/constant'
import MainButton from '../components/MainButton'
import { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'


const Hero = () => {
   const [indexOfService, setIndexOfService] = useState(0);

   useEffect(() =>{
      const interval = setInterval(() => {
         setIndexOfService((indexOfService + 1) % serviceLists.length)
      }, 2000)

      return () => clearInterval(interval)
   }, [indexOfService])

   useGSAP(() => {
      document.fonts.ready.then(() => {
         const paragraph = new SplitText('.paragraph', { type: 'lines' });
         const timeline = gsap.timeline({
            scrollTrigger: {
               trigger: '.hero-wrapper',
               start: 'top center',
               end: 'bottom top',
               scrub: true
            }
         })
      
         timeline.to('.hero', {
            scale: 1.5,
            duration: 1,
            ease: 'power3.inOut'
         })
      
         gsap.from(paragraph.lines, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.inOut',
            delay: 0.5,
            stagger: 0.1
         })
      })
   }, [])

   return (
      <section id='home' className='hero-wrapper w-full min-h-[100dvh] flex justify-center relative bg-slate-950 overflow-hidden'>
         <div className='bg-container w-[100vw] h-dvh absolute z-0 top-0 left-0'>
            <img src="/images/bg-hero.webp" alt="Hero" className='hero test-white w-full h-full object-cover mask-t-from-80% mask-b-from-50% brightness-50'/>
         </div>

         <div className='w-full max-w-[1536px] h-dvh grid grid-cols-1 sm:grid-cols-2 relative z-1'>
            <div
               className={`
               w-full h-full flex flex-col justify-between items-start 
               p-[min(10vw,60px)] lg:pt-65 sm:pt-60 pt-55`}>
                  <h2 className='paragraph text-[clamp(20px,5vw,60px)] font-inter text-white'>
                     Animal Clinic
                  </h2>

                  <ul className='paragraph hidden w-full sm:flex flex-col gap-5 font-inter font-extralight'>
                     {serviceLists.map((service, index) => (
                        <li key={index} className={`text-2xl text-white z-1 ${indexOfService === index ? 'scale-150 font-bold opacity-100' : 'opacity-50'} ease-in-out duration-500 origin-left`}>
                           {service.name}
                        </li>
                     ))}
                  </ul>
            </div>

            <div className='w-full h-full flex flex-col justify-end items-center p-[min(10vw,60px)]'>
               <p className='paragraph text-[clamp(20px,5vw,60px)] mb-[clamp(20px,5vw,60px)] text-center sm:text-right font-inter sm:font-semibold font-extralight text-slate-100'>
                  Cuz They're More Than Just Pets
               </p>
               <MainButton label='GET PET CARE'/>
            </div>
         </div>

         <div
            onClick={() => window.scrollTo({ top: window.innerHeight - 200, behavior: 'smooth' })}
            className='z-1 absolute bottom-10 right-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer'>
               <svg className="animate-pulse w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
               </svg>
               <p className='text-sm text-slate-100'>
                  Scroll
               </p>
         </div>
      </section>
   )
}

export default Hero