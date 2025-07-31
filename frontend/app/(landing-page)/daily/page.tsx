// import { useRef } from "react"
import { news } from "@/app/constant"
import Image from "next/image";
import CardNews from "./components/CardNews";
import AnimatedText from "../components/AnimatedText";
import PromoBanner from "@/public/images/promo.webp";


export default function Daily () {
   // const promoModalRef = useRef<HTMLDialogElement>(null);

   // const handleModal = () => {
   //    promoModalRef.current?.showModal();
   // }

   return (
      <section id="daily" className='w-full h-fit flex justify-center items-center relative'>
         <div className='w-full max-w-[1536px] h-fit flex-col justify-center items-center p-[min(7vw,100px)] text-[var(--text-color)] mt-18'>
            {/* title */}
            <header className="w-full grid lg:grid-cols-[1.5fr_1fr] grid-cols-1 gap-20 text-inter pb-10 border-b-1 border-[var(--text-color)]/20">
               <div className="w-full flex flex-col gap-5">
                  <AnimatedText
                     triggerWrapper='#daily'
                     type='h1'
                     splitBy='lines'
                     className='text-3xl flex flex-col gap-5'
                  >
                     <span className="daily-title font-bold text-5xl">Welcome to Cat Daily</span>
                     <span className="paragraph">— your go-to space for everything about cats, every single day.</span>
                  </AnimatedText>
                  <AnimatedText
                     triggerWrapper='#daily'
                     type='p'
                     splitBy='lines'>
                     Discover fun facts, the latest news, and useful tips and tricks from around the world to help you better understand and care for your feline friends.
                     Whether you`re a new cat owner or a lifelong cat lover, we’ve got something to make both you and your kitty purr with joy.
                  </AnimatedText>
               </div>

               <div className='tooltip tooltip-open tooltip-accent w-full flex justify-center lg:justify-end items-center cursor-pointer group' data-tip="Click to more info">
                  <Image src={PromoBanner} alt="promo image" className='w-[400px] h-fit shrink-0 group-hover:scale-105 ease-in-out duration-300'/>
               </div>
            </header>

            <main className="w-full h-fit flex flex-col mt-10">
               {/* search input */}
               <div className="w-full h-fit flex justify-start mb-10">
                  <div className="w-full max-w-[300px] relative">
                     <svg className="w-6 h-6 absolute top-1/2 left-3 -translate-y-1/2 text-[var(--text-color)] z-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                     </svg>

                     <input type="search" name="search" id="" className="w-full py-2 px-5 pl-10 border-1 border-[var(--text-color)]/20 outline-0 backdrop-brightness-90 rounded-md bg-[var(--primary-color)]/30 backdrop-blur-2xl" placeholder="Search news here.."/>
                  </div>
               </div>

               {/* news */}
               <div className="w-full h-[max-content] news-wrapper pt-5 mask-y-from-95%">
                  {news.map((item, index) => (
                     <CardNews title={item.title} badge={item.badge} imgSrc={item["image-src"]} link={item["web-scraper-start-url"]} key={index}/>
                  ))}
               </div>
            </main>
         </div>

         {/* <dialog ref={promoModalRef} id="my_modal_2" className="modal">
            <div className="modal-box font-inter">
               <h3 className="font-bold text-lg">Hello Pawrents!</h3>
               <p className="py-4">Press ESC key or click outside to close</p>
               <Image src={PromoBanner} alt="promo poster image" />
            </div>
            <form method="dialog" className="modal-backdrop">
               <button>close</button>
            </form>
         </dialog> */}
      </section>
   )
}