import { useGSAP } from '@gsap/react'
import MagneticButton from '../../../shared/components/MagneticButton'
import useStore from '../../../shared/hooks/useStore';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText)

const Hero = () => {
   const isMobile = useStore(state => state.isMobile);

   useGSAP(() => {
      const paragraph = new SplitText('.paragraph', { type: 'lines' });

      gsap.from(paragraph.lines, {
         opacity: 0,
         duration: 2,
         stagger: 0.1,
         delay: 1,
         ease: 'expo.inOut'
      })
   })

   return (
      <section className='hero w-full h-fit flex flex-col justify-center items-center md:pt-20'>
         <div className='w-full max-w-[1536px] h-fit grid grid-cols-1 md:grid-cols-2 px-[min(7vw,100px)] pt-20 items-start justify-center text-[var(--text-color)] '>
            <div className='w-full h-full flex items-center justify-center py-10'>
               <h1 className={`title overflow-hidden text-[clamp(3.5rem,5vw,8rem)] font-semibold font-inter leading-tight ${isMobile ? "text-center": "text-left"}`}>
                  Complete <br />
                  Cat Care <br />
                  <span className='bg-[url(/images/texture.jpg)] bg-cover bg-clip-text text-transparent text-shadow-xs'>Service</span>
               </h1>
            </div>
            <div className={`w-full h-full flex flex-col items-center md:items-start gap-10 justify-start md:justify-center`}>
               <p className='paragraph text-[clamp(1rem,1.5vw,2rem)] font-inter text-left'>Whether it's routine checkups or complex procedures, our services are thoughtfully designed to support your feline friend’s health and happiness—at every whiskered milestone.</p>
               <MagneticButton type='fill' link="/services">Get an Appointment</MagneticButton>
            </div>
         </div>
      </section>
   )
}

export default Hero