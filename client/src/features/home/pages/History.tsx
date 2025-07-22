import { sliderImageLists } from "../../../shared/constants/constant"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Slider = ({ direction = "left" }: { direction?: "left" | "right" }) => {
   return (
      <ul className={`w-[max-content] h-fit flex gap-5 ${direction === "left" ? "animate-slide-left" : "animate-slide-right"}`}>
         {sliderImageLists.concat(sliderImageLists).map((image, index) => (
            <li key={index} className="w-30 aspect-square overflow-hidden rounded-lg shadow-(color:--text-color) shadow-md shrink-0">
               <img src={image.url} alt="cat image" loading="lazy" className="w-full h-full object-cover"/>
            </li>
         ))}
      </ul>
   )
}

const History = () => {

   useGSAP(() => {
      const timeline = gsap.timeline({
         scrollTrigger: {
            trigger: '.history-wrapper',
            start: 'top center',
            end: 'top top',
            scrub: true
         }
      })

      timeline.from('.content', {
         y: 100,
         opacity: 0,
         duration: 0.5,
         ease: 'power1.inOut'
      })
   }, [])

   return (
      <section id="history" className='history-wrapper w-full h-fit flex justify-center items-center'>
         <div className='w-full max-w-[1536px] h-fit flex flex-col items-between p-10'>
            <div className="w-full h-fit overflow-hidden mask-x-from-90% py-3">
               <Slider direction="left" />
            </div>

            <div className="w-full h-fit flex flex-col gap-5 my-[10vw] items-center sm:px-[100px] sm:text-center">
               <h1 className="content text-[clamp(2.5rem,5vw,6rem)] font-bold font-inter text-[var(--text-color)]">
                  SINCE{" "}
                  <span className="bg-[url(/images/texture.jpg)] bg-fill bg-clip-text text-transparent text-texture text-shadow-xs">2018</span>
               </h1>
               <p className="content text-lg font-inter text-[var(--text-color)] text-[clamp(1rem,1.5vw,2rem)]">We've been dedicated to keeping your furry family members healthy and happy. Founded with passion and love for animals, our clinic has grown into a trusted space for pet owners who seek not just treatment—but compassionate, professional care in every visit."</p>
            </div>

            <div className="w-full h-fit overflow-hidden mask-x-from-90% py-3 flex justify-end">
               <Slider direction="right" />
            </div>
         </div>
      </section>
   )
}

export default History