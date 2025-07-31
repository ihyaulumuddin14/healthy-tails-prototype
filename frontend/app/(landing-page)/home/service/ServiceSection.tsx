'use client'

import { animate, scroll } from 'motion'
import { serviceLists } from '@/app/constant'
import { useEffect } from 'react'
import Stagger from './components/Stagger'
import Image from 'next/image'
import GMapsImage from '@/public/images/gmaps-icon.svg'
import ServiceCard from './components/ServiceCard'

export default function ServiceSection() {

   useEffect(() => {
      if (window.innerWidth < 640) return;

      const serviceGroup = document.querySelector('.service-group') as HTMLElement;
      const serviceGroupContainer = document.querySelector('.service-group-container') as HTMLElement;

      if (!serviceGroup || !serviceGroupContainer) return;

      const totalScroll = serviceGroup.scrollWidth - serviceGroupContainer.clientWidth;;

      scroll(
         animate(serviceGroup, {
            transform: ['none', `translateX(-${totalScroll}px)`]
         }),
         { target: serviceGroupContainer }
      )

      scroll(
         animate('.progress-bar', {
            scaleX: [0, 1],
            transformOrigin: 'left'
         }),
         { 
            target: serviceGroupContainer,
            offset: ["start -30%", "end end"]
         }
      )
   }, [])

   return (
      <section id='service' className='service-group-container w-screen h-full sm:h-[calc(300vw+15rem)] relative'>
         <div className='w-[100vw] h-fit sm:sticky sm:top-0 sm:h-screen  overflow-hidden'>
            <ul className='service-group flex flex-col items-center w-fit sm:w-[calc(300vw+15rem)] p-[min(7vw,60px)] h-fit sm:flex-row sm:items-start sm:h-screen gap-10 overflow-hidden pt-25'>
               {/* maps reviews card */}
               <li className='service-card flex gap-5 bg-[var(--color-foreground)]/10 rounded-4xl hover:bg-[var(--color-foreground)]/20 hover:scale-98 ease-in-out duration-300'>
                  <h1 className='flex justify-center items-center gap-5'>
                     <Stagger className='font-bold xl:text-8xl lg:text-6xl text-5xl'>700</Stagger>
                     <span className='flex-text-1'>
                        Pet Parents
                     </span>
                  </h1>

                  <p className='xl:text-4xl lg:text-3xl md:text-2xl text-xl leading-[1.3]'>
                     can`t be wrong <br />
                     - check our Google Reviews
                  </p>

                  <a href="https://maps.app.goo.gl/haCJXQjGzteiUURNA" target='_blank' className='relative group'>
                     <Image
                        loading='lazy'
                        src={GMapsImage}
                        alt="google maps icon"
                        className='peer w-[10rem] mt-10 cursor-pointer hover:scale-110 ease-in-out duration-300 origin-bottom'
                     />
                     <Image
                        loading='lazy'
                        aria-hidden="true"
                        src={GMapsImage}
                        alt="google maps icon"
                        className='absolute w-[10rem] bottom-0 pointer-events-none blur-sm animate-pulse peer-hover:scale-110 hover:animate-shake ease-in-out duration-300 origin-bottom brightness-130 opacity-50'
                     />
                  </a>
               </li>

               {/* service card */}
               {serviceLists.map((service, index) => (
                  <ServiceCard
                     key={index}
                     title={service.name}
                     summary={service.summary}
                  />
               ))}

               {/* progress bar */}
               <div className='hidden sm:block absolute ml-[calc(75vw+2.5rem)] bottom-5 lg:bottom-20 h-5 w-[calc(200vw+10rem)] bg-[var(--color-foreground)]/10 rounded-full overflow-hidden'>
                  <div className='progress-bar w-full h-full bg-[var(--color-tertiary)]'></div>
               </div>
            </ul>
         </div>
      </section>
   )
}
