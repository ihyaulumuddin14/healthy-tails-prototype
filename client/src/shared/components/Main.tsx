import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect } from "react"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

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
      <main id="smooth-wrapper" className="w-full h-screen gradient-background flex flex-col items-center relative">
         <div id="smooth-content" className="w-full h-fit flex flex-col items-center">
            {children}
         </div>
      </main>
   )
}

export default Main