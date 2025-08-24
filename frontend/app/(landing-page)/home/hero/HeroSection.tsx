import Image from 'next/image'
import HeroImage from '@/public/images/bg-hero.webp'
import MainButton from '../../../../components/ui/MainButton'
import ServicesList from './components/ServicesList'
import ScrollDown from './components/ScrollDown'
import AnimatedText from '../../components/AnimatedText'


const Hero = () => {
   return (
      <section id='home' className='w-full min-h-[110vh] h-fit flex justify-center bg-transparent overflow-hidden relative mask-b-from-90%'>
         <div className='bg-container w-[100vw] min-h-[110vh] h-full absolute z-0 top-0 left-0 blur-sm'>
            <Image src={HeroImage} loading='eager' alt="Hero" className='text-[var(--color-foreground)] w-full h-full object-cover brightness-50' />
         </div>

         <div className={`content-wrapper min-h-screen grid grid-cols-1 sm:grid-cols-[1fr_0.7fr] relative pb-[min(15vw,60px)]`}>
            <div className={`w-full h-full flex flex-col justify-between items-start pl-[min(6vw,60px)] pr-0 sm:pt-55 pt-40`}>
               <span className='mb-30'>
                  <AnimatedText
                     triggerWrapper='#home'
                     type='h1'
                     splitBy='lines'
                     className='xl:text-8xl md:text-6xl text-5xl font-bold text-white whitespace-nowrap'
                     addLineHeight
                     >
                        Healthy Tails
                  </AnimatedText>
                  <h2 className='xl:text-5xl lg:text-4xl md:text-2xl text-xl font-inter text-white'>Animal Clinic</h2>
               </span>
               <ServicesList />
            </div>

            <div className='w-full h-full flex flex-col justify-end sm:items-end items-center p-[min(7vw,60px)] gap-10'>
               <p className='xl:text-6xl flex-text-1 text-center sm:text-right font-inter sm:font-semibold font-extralight text-slate-100'>Cuz They`re More Than Just Pets</p>
               <MainButton label='GET PET CARE'/>
            </div>
         </div>

         <ScrollDown />
      </section>
   )
}

export default Hero