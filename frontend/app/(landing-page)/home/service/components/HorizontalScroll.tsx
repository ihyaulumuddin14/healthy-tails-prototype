'use client'

import { animate, scroll } from "motion/react";
import { useEffect } from "react";

type Props = {
   children: React.ReactNode,
   id: string
}


export function Container({ children, id }: Props) {
   useEffect(() => {
      const serviceGroup = document.querySelector('.service-group') as HTMLElement;
      const serviceGroupContainer = document.querySelector('.service-group-container') as HTMLElement;

      if (window.innerWidth < 640) return;
      
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
      <section id={id} className='service-group-container w-screen h-full sm:h-[calc(300vw+12.5rem)] relative'>
         <div className='w-screen h-fit sm:sticky sm:top-0 sm:h-screen overflow-hidden'>
            <ul className='service-group flex flex-col items-center w-fit sm:w-[calc(300vw+12.5rem)] p-[min(7vw,60px)] h-fit sm:flex-row sm:items-start sm:justify-center sm:h-screen gap-10 pt-25 overflow-hidden'>
               {children}
               <div className='hidden sm:block absolute ml-[50vw] bottom-5 lg:bottom-20 h-5 w-[calc(200vw+10rem)] bg-[var(--color-foreground)]/10 rounded-full overflow-hidden'>
                  <div className='progress-bar w-full h-full bg-[var(--color-tertiary)]'></div>
               </div>
            </ul>
         </div>
      </section>
   )
}

export const HorizontalScroll = {
   Container
}
export default HorizontalScroll;