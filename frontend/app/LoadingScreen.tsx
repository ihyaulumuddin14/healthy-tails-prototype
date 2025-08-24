'use client'

import useGlobalLoading from "@/stores/loadingStore"
import { useEffect } from "react";

export default function LoadingScreen() {
   const setPageLoading = useGlobalLoading((state) => state.setPageLoading);
   
   useEffect(() => {
      setPageLoading(true);
      return () => setPageLoading(false);
   }, [])

   return (
      <section id="loading" className='w-full h-screen flex flex-col justify-center items-center bg-[var(--color-background)] transition-all duration-1000 ease-in-out'>
         <video src="/animation/Loader cat.webm" autoPlay loop muted></video>
         <p className="text-[clamp(0.8rem,1.5vw,1rem)] text-[var(--color-foreground)] font-inter font-semibold">Wait a minute..</p>
      </section>
   )
}