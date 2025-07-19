import React from 'react'
import RedirectButton from './RedirectButton'

type Props = {
   srcImg: string,
   productName: string,
   price: number,
   rating?: number,
   sold?: number,
   redirectLabel: string,
   link?: string
}

const CardProduct = ({ srcImg, productName, price, rating, sold, redirectLabel, link = "/" }: Props) => {
   return (
      <div className='w-[250px] aspect-4/6 rounded-2xl relative shrink-0 flex flex-col items-center group overflow-hidden snap-start cursor-pointer backdrop-blur-3xl'>
         <img
            src={srcImg}
            alt="product img"
            className='h-[70%] object-cover absolute top-0 z-0 group-hover:scale-120 group-hover:rotate-3 ease-in-out duration-300'/>

         <div className='description w-full h-fit flex flex-col items-start bg-[var(--primary-color)]/40 mask-t-from-90% p-5 absolute z-1 bottom-0 group-hover:translate-y-50 ease-in-out duration-500 gap-2'>
            <h2 className='text-[var(--text-color)] text-[clamp(1rem,1.5vw,1.2rem)] font-semibold font-inter line-clamp-1'>{productName}</h2>
            <p className='text-[var(--text-color)] text-[clamp(0.8rem,1.5vw,1rem)] font-light font-inter'>IDR.{price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
            <div className='flex gap-2 text-[var(--text-color)] items-center'>
               <span className='w-fit flex gap-1 text-[var(--text-color)] text-[clamp(0.8rem,1.5vw,1rem)] font-semibold font-inter items-center'>
                  <svg className="w-6 h-6 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                  </svg>
                  {rating}
               </span>
               |
               <span className='text-[var(--text-color)] text-[clamp(0.8rem,1.5vw,1rem)] font-semibold font-inter'>
                  {sold} sold
               </span>
            </div>
         </div>

         <RedirectButton label={redirectLabel} onClick={() => window.location.href = link} />
      </div>
   )
}

export default CardProduct