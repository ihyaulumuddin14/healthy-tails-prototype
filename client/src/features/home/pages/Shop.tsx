import { favoriteProducts } from '../../../shared/constants/constant'
import CardProduct from '../components/CardProduct'
import MagneticButton from '../../../shared/components/MagneticButton'

const Shop = () => {
   return (
      <section id='shop' className='w-full h-fit flex justify-center items-center mb-20'>
         <div className='w-full max-w-[1536px] h-fit flex flex-col items-center px-[min(7vw,100px)]'>
            <p className='shop-subtitle font-inter text-[var(--text-color)] text-[clamp(0.8rem,1.5vw,1rem)] max-w-2xl text-center mb-3'>
               Discover our most-loved cat essentials — from delicious treats to must-have accessories, curated for your feline's happiness.
            </p>
            <h1 className='font-inter text-[var(--text-color)] text-[clamp(2rem,5vw,4rem)] font-bold mb-10'>Shop Cat Favorites</h1>

            <div className='w-full max-w-5xl pb-5 flex gap-10 overflow-x-auto snap-x snap-proximity custom-scrollbar mb-10'>
               {favoriteProducts.map((product, index) => (
                  <CardProduct redirectLabel='See Product' key={index} {...product} />
               ))}
            </div>

            <MagneticButton type='fill' link="">View All</MagneticButton>
         </div>
      </section>
   )
}

export default Shop