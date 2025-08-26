import AnimatedText from "../../components/AnimatedText"
import AppointmentButton from "./AppointmentButton"

const Hero = () => {
   return (
      <section id="home" className='section-wrapper flex-col md:pt-20'>
         <div className='content-wrapper grid grid-cols-1 md:grid-cols-2 px-[min(7vw,100px)] pt-20 items-start justify-center text-[var(--color-foreground)] '>
            <div className='w-full h-full flex items-center justify-center py-10'>
               <AnimatedText
                  type='h1'
                  splitBy='lines'
                  triggerWrapper="#home"
                  className="font-bold text-[clamp(3.5rem,5vw,8rem)] font-inter leading-tight text-center sm:text-left"
               >
                  Complete <br />
                  Cat Care <br />
                  <span className='text-texture text-shadow-xs'>Service</span>
               </AnimatedText>
            </div>
            <div className={`w-full h-full flex flex-col sm:flex-row md:flex-col items-center md:items-start gap-10 justify-start md:justify-center`}>
               <p className='paragraph text-[clamp(1rem,1.5vw,2rem)] font-inter text-center sm:text-left'>Whether it`s routine checkups or complex procedures, our services are thoughtfully designed to support your feline friend’s health and happiness—at every whiskered milestone.</p>
               <AppointmentButton />
            </div>
         </div>
      </section>
   )
}

export default Hero