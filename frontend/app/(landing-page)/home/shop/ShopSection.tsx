import { favoriteProducts } from '@/app/constant'
import CardProduct from './components/ProductCard'
import BasicButton from '@/components/ui/BasicButton'
import AnimatedText from '../../components/AnimatedText'

export default function Shop () {
   return (
      <section id='shop' className='w-full h-fit flex justify-center items-center mb-20'>
         <div className='content-wrapper flex flex-col items-center px-[min(7vw,100px)]'>
            <p className='shop-subtitle font-inter text-[var(--text-color)] text-[clamp(0.8rem,1.5vw,1rem)] max-w-2xl text-center mb-3'>
               Discover our most-loved cat essentials — from delicious treats to must-have accessories, curated for your feline`s happiness.
            </p>
            <AnimatedText
               triggerWrapper='#shop'
               type='h1'
               splitBy='lines'
               className='font-bold mb-10 lg:text-6xl md:text-5xl text-4xl'
               addLineHeight
               >
                  Shop Cat Favorites
            </AnimatedText>
            <h1 className='font-inter text-[var(--text-color)] text-[clamp(2rem,5vw,4rem)] font-bold mb-10'></h1>

            <div className='w-full max-w-5xl pb-5 flex gap-10 overflow-x-auto snap-x snap-proximity custom-scrollbar mb-10'>
               {favoriteProducts.map((product, index) => (
                  <CardProduct redirectLabel='See Product' key={index} {...product} />
               ))}
            </div>

            <BasicButton model='fill' width='auto'>
               Shop Now
               <svg className="w-6 h-6 text-slate-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
               </svg>

            </BasicButton>
         </div>
      </section>
   )
}