'use client'

import RedirectButton from "@/app/(landing-page)/components/RedirectButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
   title: string;
   summary: string;
   link?: string;
}

export default function ServiceCard({ title, summary, link }: Props) {
   const router = useRouter();
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      setIsMobile(window.innerWidth < 640);
   }, [])

   return (
      <li className='service-card justify-start group sm:border-0 border-b-1 rounded-4xl hover:bg-[var(--color-foreground)]/5 ease-in-out duration-200'>
         <header className="mb-5 md:mb-10 lg:mb-20">
            <h1 className="flex-text-2 font-bold group-hover:text-[var(--color-tertiary)] ease-in-out duration-200">{title}</h1>
         </header>
         <main className="relative pb-20 overflow-hidden">
            <p className="flex-text-0">{summary}</p>
            <RedirectButton
               transition={!isMobile}
               label="See Details" 
               onClick={() => {if (link) router.push(link)}}
               position="right"/>
         </main>
      </li>
   )
}
