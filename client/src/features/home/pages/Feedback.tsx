import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { reviewClients } from '../../../shared/constants/constant'
import CardReview from '../components/CardReview'
import { useEffect, useRef, useState } from 'react'

const Feedback = () => {
   const [activeIndex, setActiveIndex] = useState(0);
   const carouselRef = useRef<HTMLUListElement | null>(null);

   useEffect(() => {
      const interval = setInterval(()=> {
         setActiveIndex(activeIndex => activeIndex + 1)
      }, 5000)

      return () => clearInterval(interval)
   }, []);

   useEffect(() => {
      if (carouselRef.current) {
         let timeout;
   
         if (activeIndex === reviewClients.length) {
            timeout = setTimeout(() => {
               if (carouselRef.current) {
                  carouselRef.current.style.transition = "none";
                  setActiveIndex(0);
               }
            }, 500);
         } else {
            if (activeIndex === 0) {
               timeout = setTimeout(() => {
                  if (carouselRef.current) {
                     carouselRef.current.style.transition = "transform 0.5s ease-in-out";
                  }
               }, 500)
            } else {
               carouselRef.current.style.transition = "transform 0.5s ease-in-out";
            }
         }
   
         return () => clearTimeout(timeout!);
      }
   }, [activeIndex])

   useGSAP(() => {
      document.fonts.ready.then(() => {
         const captReview = new SplitText('.caption-review', { type: 'lines' });

         gsap.from(captReview.lines, {
            xPercent: -100,
            opacity: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
               trigger: '.review-wrapper',
               start: 'top 90%',
               once: true
            }
         })
      })
   }, [])

   return (
      <section id='feedback' className='review-wrapper w-full h-fit flex justify-center items-center'>
         <div className='w-full max-w-[1536px] flex flex-col overflow-hidden'>
            <h1 className='caption-review self-start text-[var(--text-color)] border-l-2 border-[var(--secondary-color)] pl-2 font-semibold text-2xl mb-10 mx-[min(7vw,100px)]'>
               <span className='bg-[url(/images/texture.jpg)] bg-cover text-shadow-2xs bg-clip-text text-transparent text-texture'>Your feedback</span>
               {" "}keeps us going
            </h1>
            
            <div className='self-center w-[80vw] max-w-[1000px] relative overflow-hidden'>
               <ul
                  ref={carouselRef}
                  style={{transform: `translateX(-${activeIndex/(reviewClients.length+1) * 100}%)`}}
                  className='w-[max-content] h-[max-content] flex ease-in-out duration-500'>
                     {reviewClients.concat(reviewClients[0]).map((client, index) => (
                        <CardReview key={index} {...client} />
                     ))}
               </ul>

               <div className='w-fit hidden sm:flex absolute top-0 right-0 gap-2'>
                  {reviewClients.map((_, index) => (
                     <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 bg-[var(--text-color)] rounded-full ${activeIndex === index ? 'opacity-100 w-5' : 'opacity-50'} ease-in-out duration-300 cursor-pointer`}>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Feedback