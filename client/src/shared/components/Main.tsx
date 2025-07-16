import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useLayoutEffect } from "react"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Main = ({ children }: { children: React.ReactNode }) => {
      
   useLayoutEffect(() => {

      const smoother = ScrollSmoother.create({
               wrapper: '#smooth-wrapper',
               content: '#smooth-content',
               smooth: 1.5,
               effects: true,
               smoothTouch: 0.5
            })
      
      return () => smoother.kill()
   }, [])
      

   return (
      <main id="smooth-wrapper" className="w-full h-screen bg-[var(--primary-color)] flex flex-col items-center relative">
         <div id="smooth-content" className="w-full min-h-[1000vh] flex flex-col items-center">
            {children}
         </div>
      </main>
   )
}

export default Main