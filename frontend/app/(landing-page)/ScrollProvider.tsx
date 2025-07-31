'use client'

import { useEffect} from "react";
import Lenis from 'lenis'

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      const lenis = new Lenis();

      function raf(time: number) {
         lenis.raf(time*0.5);
         requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
         lenis.destroy();
      };
   }, [])


   return (
      <main className="h-fit w-full">
         <div className="w-full h-screen gradient-background fixed z-[-1]"></div>
         {children}
      </main>
   );
}
