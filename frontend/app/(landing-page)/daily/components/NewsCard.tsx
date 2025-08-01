'use client'

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
   title: string,
   badge: string,
   imgSrc: string,
   link: string
}

const NewsCard = ({ title, badge, imgSrc, link }: Props) => {

   const copyLink = async () => {
      await navigator.clipboard.writeText(link);
   }

   return (
      <div className='news-card w-full h-full p-5 flex flex-col border-2 border-[var(--color-tertiary)]/20 rounded-2xl text-inter bg-[var(--foreground)]/10 backdrop-blur-3xl group'>
         <header className="w-full h-fit flex flex-col gap-2 mb-5 cursor-pointer group/header">
            <Badge variant="default">{badge}</Badge>
            <h2 className="text-2xl leading-7 font-bold group-hover/header:text-[var(--color-tertiary)] ease-in-out duration-100">{title}</h2>
         </header>
         
         <main className="w-full h-fit overflow-hidden rounded-lg">
            <Image src={imgSrc} loading="lazy" alt="news image" width={200} height={200} className="w-full h-fit group-hover:scale-110 ease-in-out duration-300"/>
         </main>

         <footer className="w-full mt-3 flex justify-end">
            <Tooltip>
               <TooltipTrigger asChild>
                  <div onClick={copyLink} className="w-fit h-fit p-1 text-[var(--color-foreground)] cursor-pointer bg-transparent rounded-md hover:bg-[var(--color-foreground)]/20 ease-in-out duration-100">
                     <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                     </svg>
                  </div>
               </TooltipTrigger>
               <TooltipContent>
                  <p>Copy Link</p>
               </TooltipContent>
            </Tooltip>
         </footer>
      </div>
   )
}

export default NewsCard