import TabelHours from './components/TabelHours';
import AnimatedText from '../../components/AnimatedText';
import Offering from './components/Offering';

export default function Hours () {

   return ( 
      <section id='hours' className='w-full h-fit flex justify-center items-center '>
         <div className='content-wrapper flex flex-col items-center gap-2 py-20 px-[min(7vw,100px)]'>
            <AnimatedText
               triggerWrapper='#hours'
               type='h1'
               splitBy='lines'
               className='flex-text-2'
               addLineHeight
               >
               <span className='text-texture font-bold'>PAWS UP</span>,
               WE`RE OPEN!
            </AnimatedText>


            <AnimatedText
               triggerWrapper='#hours'
               type='p'
               splitBy='lines'
               className='lg:text-2xl md:text-xl text-[var(--color-foreground)] mb-20'
            >
               Tail wags and care — check our operating hours below.
            </AnimatedText>

            <TabelHours />
            <Offering />
         </div>
      </section>
   )
}