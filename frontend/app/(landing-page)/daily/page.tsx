'use client'

import Image from "next/image";
import AnimatedText from "../components/AnimatedText";
import PromoBanner from "@/public/images/promo.webp";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DialogTrigger } from "@/components/ui/dialog";
import PromoModal from "./components/PromoModal";
import Cards from "./components/Cards";

export default function Daily () {
   return (
      <section id="daily" className='w-full h-fit flex justify-center items-center relative'>
         <div className='w-full max-w-[1536px] h-fit flex-col justify-center items-center p-[min(7vw,100px)] text-[var(--text-color)] mt-18'>
            {/* title */}
            <header className="w-full grid lg:grid-cols-[1.5fr_1fr] grid-cols-1 gap-20 text-inter pb-10 border-b-1 border-[var(--color-foreground)]/20">
               <div className="w-full flex flex-col gap-5">
                  <AnimatedText triggerWrapper='#daily' type='h1' splitBy='lines' className='font-bold lg:text-7xl md:text-6xl text-5xl mb-5'>
                     Welcome to Cat Daily
                  </AnimatedText>
                  <AnimatedText triggerWrapper="#daily" type="p" splitBy="lines" className="lg:text-2xl md:text-xl">
                     — your go-to space for everything about cats, every single day.
                  </AnimatedText>
                  <AnimatedText triggerWrapper='#daily' type='p' splitBy='lines'>
                     Discover fun facts, the latest news, and useful tips and tricks from around the world to help you better understand and care for your feline friends.
                     Whether you`re a new cat owner or a lifelong cat lover, we’ve got something to make both you and your kitty purr with joy.
                  </AnimatedText>
               </div>

               <div className="w-fit h-fit flex justify-center group lg:justify-self-end lg:self-center justify-self-center">
                  <Tooltip>
                     <TooltipTrigger>
                        <DialogTrigger asChild>
                           <Image src={PromoBanner} loading="lazy" alt="promo image" className='w-[400px] h-fit shrink-0 group-hover:scale-105 ease-in-out duration-300 cursor-pointer'/>
                        </DialogTrigger>
                     </TooltipTrigger>
                     <TooltipContent>
                        Click to see details
                     </TooltipContent>
                  </Tooltip>
               </div>
            </header>

            <main className="w-full h-fit flex flex-col mt-10">
               {/* search input */}
               <div className="w-full relative max-w-[300px]">
                  <label htmlFor="search" className="text-[var(--color-muted-foreground)] absolute top-1/2 -translate-y-1/2 left-4">
                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                     </svg>
                  </label>
                  <input id="search" type="text" className="w-full px-3 py-2 pl-13 outline-0 bg-[var(--color-foreground)]/10 rounded-4xl focus:rounded-none transition-all duration-400 ease-in-out peer" placeholder="Search"/>
                  <div className="peer-focus:w-full w-0 h-0 border-t-2 border-[var(--color-accent)] absolute bottom-0 origin-center transition-all duration-400 ease-in-out"></div>
               </div>

               {/* news */}
               <div className="w-full h-[max-content] news-wrapper pt-5 ">
                  <Cards/>
               </div>
            </main>
         </div>      
         
         <PromoModal />
      </section>
   )
}