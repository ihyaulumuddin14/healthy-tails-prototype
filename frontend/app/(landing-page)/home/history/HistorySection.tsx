'use client'

import dynamic from 'next/dynamic';
import AnimatedText from '../../components/AnimatedText';

const VelocitySlider = dynamic(() => import('./components/VelocitySlider'), {
  ssr: false
});

export default function HistorySection() {
   return (
      <section id='history' className='section-wrapper'>
         <div className='content-wrapper p-[min(7vw,60px)] flex flex-col justify-between items-center gap-30 sm:gap-50'>
            <VelocitySlider initDirection='left' />
            <div className='flex flex-col justify-center items-center gap-10'>
               <AnimatedText
                  reverse={true}
                  triggerWrapper='#history'
                  type='h1'
                  splitBy='lines'
                  className='xl:text-8xl lg:text-7xl md:text-6xl text-5xl font-bold text-[var(--color-foreground)] text-center'
                  >
                     SINCE <span className='text-texture'>2018</span>
               </AnimatedText>
               <AnimatedText
                  triggerWrapper='#history'
                  type='p'
                  splitBy='lines'
                  className='sm:text-2xl lg:text-3xl text-lg text-center font-inter text-[var(--color-foreground)]'
                  >
                     We`ve been dedicated to keeping your furry family members healthy and happy. Founded with passion and love for animals, our clinic has grown into a trusted space for pet owners who seek not just treatment—but compassionate, professional care in every visit.
               </AnimatedText>
            </div>
            <VelocitySlider initDirection='right' />
         </div>
      </section>
   )
}
