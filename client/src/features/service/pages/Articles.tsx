import { useEffect, useRef, useState } from 'react'
import useStore from '../../../shared/hooks/useStore'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { serviceLists } from '../../../shared/constants/constant'

gsap.registerPlugin(SplitText, ScrollTrigger)
const sections = serviceLists.map(section => section.articles.id);

const Articles = () => {
   const isMobile = useStore(state => state.isMobile);
   const [active, setActive] = useState("");
   const serviceWrapperRef = useRef<HTMLDivElement>(null);
   const asideNavServiceRef = useRef<HTMLElement>(null);
   const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

   const scrollToSection = (sectionID: string) => {
      gsap.to(window, {
         duration: 0.5,
         scrollTo: {
            y: `#${sectionID}`,
            offsetY: 120
         },
         ease: 'power1.inOut'
      })
   }

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setActive(entry.target.id);
               }
            })
         },
         {
            threshold: 0.4
         }
      );

      sections.forEach((section) => {
         const element = document.getElementById(section);
         if (element) observer.observe(element);
      })

      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      const timer = setTimeout(() => {
         const title = new SplitText('.title', { type: 'lines' });

         if (!isMobile) {
            const pinST = ScrollTrigger.create({
               trigger: serviceWrapperRef.current,
               start: 'top top',
               end: 'bottom bottom',
               pin: asideNavServiceRef.current,
               pinSpacing: false,
               anticipatePin: 1,
               scrub: true
            })

            scrollTriggersRef.current.push(pinST);
         }
   
         gsap.from(title.lines, {
            y: 50,
            opacity: 0,
            duration: 2,
            stagger: 0.1,
            ease: 'expo.inOut'
         })
      }, 100)

      return () => {
         clearTimeout(timer)
         scrollTriggersRef.current.forEach(st => st.kill());
         scrollTriggersRef.current = [];
      };
   }, [])

   return (
      <section ref={serviceWrapperRef} className='w-full h-fit flex justify-center items-center mt-20 bg-[var(--primary-color)]/70 pt-20 mask-t-from-95%'>
         <div className='w-full max-w-[1536px] h-full grid grid-cols-1 md:grid-cols-[1fr_2fr] px-[min(3vw,100px)] py-10 items-start justify-center gap-0 text-[var(--text-color)]'>
            <aside ref={asideNavServiceRef} className='w-full h-fit relative z-2 rounded-xl p-5 bg-[var(--secondary-color)]/5 border-2 border-[var(--tertiary-color)] backdrop-blur-2xl'>
               <h2 className='text-2xl font-semibold font-inter mb-5'>Our Service</h2>
               <ol className='w-full fit flex flex-col items-start pl-3'>
                  {serviceLists.map((service, index) => (
                     <li
                        key={index}
                        onClick={() => scrollToSection(service.articles.id)}
                        className={`w-full py-2 px-5 rounded-md text-sm font-inter cursor-pointer hover:opacity-80 ${active === service.articles.id ? "bg-[var(--accent-color)] text-black shadow-md" : "bg-transparent"} ease-in-out duration-300`}>
                           {index + 1}. {service.name}
                     </li>
                  ))}
               </ol>
            </aside>
            
            <div className='w-full h-fit p-[min(7vw,50px)] flex flex-col items-center gap-10 text-[var(--text-color)]'>
               {serviceLists.map((service, index) => (
                  <section className='w-full h-fit' id={service.articles.id} key={index}>
                     <h1 className='text-4xl font-bold font-inter mb-5'>{service.name}</h1>
                     <em className='text-md font-inter font-extralight'>{service.articles.subtitle}</em>

                     <figure className='w-full h-fit flex flex-col items-center justify-center my-5 rounded-2xl overflow-hidden'>
                        <img src={service.articles.image} alt={service.name} className='w-full h-full max-h-[500px] object-cover object-bottom'/>
                        <figcaption className='w-full h-fit text-center p-1 font-inter font-extralight text-xs'>{service.name}</figcaption>
                     </figure>

                     <p className='text-lg font-inter font-light'>{service.articles.content}</p>

                     {index !== serviceLists.length - 1 && <hr className='w-full border-[var(--text-color)]/20 my-10' />}
                  </section>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Articles