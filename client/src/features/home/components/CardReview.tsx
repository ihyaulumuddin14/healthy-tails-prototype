import React from 'react'

type Props = {
   imgSrc: string,
   name: string,
   reviewText: string,
   rating: number
}

const CardReview = ({ imgSrc, name, reviewText, rating }: Props) => {

   const stars = [];
   for (let i = 1; i <= Math.floor(rating); i++) {
      stars.push(
         <svg className="w-6 h-6 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
         </svg>
      )

      if ((i === Math.floor(rating)) && (i < rating) && ((i+1) > rating)) {
         stars.push(
            <svg className="w-6 h-6 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
               <path fillRule="evenodd" d="M13 4.024v-.005c0-.053.002-.353-.217-.632a1.013 1.013 0 0 0-1.176-.315c-.192.076-.315.193-.35.225-.052.05-.094.1-.122.134a4.358 4.358 0 0 0-.31.457c-.207.343-.484.84-.773 1.375a168.719 168.719 0 0 0-1.606 3.074h-.002l-4.599.367c-1.775.14-2.495 2.339-1.143 3.488L6.17 15.14l-1.06 4.406c-.412 1.72 1.472 3.078 2.992 2.157l3.94-2.388c.592-.359.958-.996.958-1.692v-13.6Zm-2.002 0v.025-.025Z" clipRule="evenodd"/>
            </svg>
         )
      }
   }

   return (
      <div className='card-review w-[80vw] max-w-[1000px] h-[max-content] grid sm:grid-cols-[1fr_3fr] grid-cols-1 sm:grid-rows-1 relative mb-20'>
         <div className='w-full h-full flex flex-col items-center justify-start text-[var(--text-color)] p-5 gap-5'>
            <img
               src={imgSrc}
               alt="client photo"
               className='w-[100px] aspect-square object-cover rounded-full'/>
            <h2 className='text-2xl font-bold'>{name}</h2>
         </div>

         <div className='w-full max-w-full h-full sm:pt-20 p-10 flex flex-col justify-between items-center gap-5'>
            <q className='review-text text-[var(--text-color)] w-full break-words text-[clamp(1rem,1.5vw,1.5rem)] font-inter'>
               {reviewText}
            </q>
            
            <div className='flex items-center gap-1 self-end'>
               <p className='text-[clamp(1rem,1.5vw,1.2rem)] font-inter text-[var(--text-color)] mr-3'>{rating} |</p>
               {stars.map((star, index) => <div key={index}>{star}</div>)}
            </div>
         </div>
      </div>
   )
}

export default CardReview