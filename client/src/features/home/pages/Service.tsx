import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { serviceLists } from '../../../shared/constants/constant'
import RedirectButton from '../components/RedirectButton'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useStore from '../../../shared/hooks/useStore'

const Service = () => {
   const [count, setCount] = useState(0);
   const isMobile = useStore((state) => state.isMobile);
   const serviceWrapperRef = useRef<HTMLDivElement>(null);
   const shineRefs = useRef<SVGSVGElement[]>([]);
   const shieldRefs = useRef<SVGSVGElement[]>([]);
   const countRef = useRef<HTMLDivElement>(null);
   
   // Refs untuk cleanup
   const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
   const timelinesRef = useRef<gsap.core.Timeline[]>([]);
   const tweensRef = useRef<gsap.core.Tween[]>([]);

   const addToShineRefs = (ref: SVGSVGElement) => {
      if (ref && !shineRefs.current.includes(ref)) {
         shineRefs.current.push(ref);
      }
   };

   const addToShieldRefs = (ref: SVGSVGElement) => {
      if (ref && !shieldRefs.current.includes(ref)) {
         shieldRefs.current.push(ref);
      }
   };

   const cleanup = () => {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];

      timelinesRef.current.forEach(tl => tl.kill());
      timelinesRef.current = [];
      
      tweensRef.current.forEach(tween => tween.kill());
      tweensRef.current = [];
   };

   useEffect(() => {
      // for DOM ready
      const timer = setTimeout(() => {
         
         if (!isMobile) {
            const pinST = ScrollTrigger.create({
               trigger: serviceWrapperRef.current,
               start: "top top",
               end: "bottom 70%",
               pin: countRef.current,
               pinSpacing: false,
               anticipatePin: 1,
               scrub: true
            });
            scrollTriggersRef.current.push(pinST);
         }

         const timeline = gsap.timeline({
            scrollTrigger: {
               trigger: serviceWrapperRef.current,
               start: 'top 80%',
               end: 'bottom 70%',
               scrub: true
            }
         });

         gsap.set(shineRefs.current, { opacity: 0 });
         gsap.set(shieldRefs.current, { scale: 0 });

         timeline
            .to(shineRefs.current, {
               opacity: 1,
               stagger: 0.2,
               duration: 1,
               ease: 'power3.inOut'
            })
            .to(shieldRefs.current, {
               scale: 1,
               stagger: 0.2,
               duration: 1,
               ease: 'power3.inOut'
            }, '<0');

         timelinesRef.current.push(timeline);

         const counterTween = gsap.to({ value: 0 }, {
            value: 700,
            duration: 2,
            ease: 'power3.inOut',
            onUpdate: function() {
               setCount(Math.floor(this.targets()[0].value));
            },
            scrollTrigger: {
               trigger: serviceWrapperRef.current,
               start: 'top 90%',
               once: true
            }
         });

         tweensRef.current.push(counterTween);

      }, 100);

      return () => {
         clearTimeout(timer);
         cleanup();
      };
   }, [isMobile]);

   return (
      <section id='service' ref={serviceWrapperRef} className='w-full h-fit flex justify-center'>
         <div className='w-full max-w-[1536px] h-fit grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]'>
            {/* left */}
            <div ref={countRef} className='w-full h-fit relative z-2 p-10 pb-40 bg-[var(--primary-color)] mask-b-from-80%'>
               <div className='w-full h-fit flex flex-col items-center'>
                  <h2 className='text-[clamp(2.5rem,5vw,6rem)] font-bold font-inter text-[var(--text-color)] inline-block'>
                     {count}+
                     <span className='text-[clamp(1rem,1.5vw,2rem)] font-inter text-[var(--text-color)] inline-block ml-5'>
                        Pet Parents
                     </span>
                  </h2>
                  <p className='text-lg font-inter text-[var(--text-color)] text-[clamp(1rem,1.5vw,2rem)] leading-[1.3]'>
                     can't be wrong <br />
                     - check our Google Reviews
                  </p>
                  <a href="https://maps.app.goo.gl/haCJXQjGzteiUURNA" target='_blank' className='relative group'>
                     <img
                        src="images/gmaps-icon.svg"
                        alt="google maps icon"
                        className='w-[clamp(100px,10vw,300px)] mt-10 cursor-pointer hover:scale-110 hover:drop-shadow-2xl hover:animate-shake drop-shadow-(color:var(--secondary-color)) ease-in-out duration-300 origin-bottom'
                     />
                     <img
                        aria-hidden="true"
                        src="images/gmaps-icon.svg"
                        alt="google maps icon"
                        className='absolute w-[clamp(100px,10vw,300px)] bottom-0 pointer-events-none blur-sm animate-pulse hover:scale-110 hover:animate-shake ease-in-out duration-300 origin-bottom brightness-130'
                     />
                  </a>
               </div>
            </div>

            {/* right */}
            <ul className='w-full h-fit p-10 flex flex-col'>
               {serviceLists.map((service, index) => (
                  <li key={index} className='grid grid-cols-[15%_85%] gap-3 group cursor-pointer'>
                     <div className='w-full h-full flex flex-col items-center justify-start relative'>
                        <svg 
                           ref={addToShineRefs}
                           className='shrink-0 w-[clamp(50px,10vw,100px)] aspect-square blur-sm' 
                           xmlns="http://www.w3.org/2000/svg" 
                           viewBox="0 0 24 24" 
                           style={{fill: 'rgba(255, 255, 255, 1)'}}
                        >
                           <path className='fill-[var(--text-color)]' d="m20.496 6.106-7.973-4a.997.997 0 0 0-.895-.002l-8.027 4c-.297.15-.502.437-.544.767-.013.097-1.145 9.741 8.541 15.008a.995.995 0 0 0 .969-.009c9.307-5.259 8.514-14.573 8.476-14.967a1 1 0 0 0-.547-.797z"></path>
                        </svg>
                        <svg 
                           ref={addToShieldRefs}
                           className='shrink-0 w-[clamp(50px,10vw,100px)] aspect-square absolute z-1 top-0' 
                           xmlns="http://www.w3.org/2000/svg" 
                           viewBox="0 0 24 24" 
                           style={{ fill: 'rgba(255, 255, 255, 1)' }}
                        >
                           <path className='fill-[var(--tertiary-color)]' d="M11.488 21.754c.294.157.663.156.957-.001 8.012-4.304 8.581-12.713 8.574-15.104a.988.988 0 0 0-.596-.903l-8.05-3.566a1.005 1.005 0 0 0-.813.001L3.566 5.747a.99.99 0 0 0-.592.892c-.034 2.379.445 10.806 8.514 15.115zM8.674 10.293l2.293 2.293 4.293-4.293 1.414 1.414-5.707 5.707-3.707-3.707 1.414-1.414z"></path>
                        </svg>
                        {index !== serviceLists.length - 1 && (
                           <hr className='h-full border-l-1 border-[var(--secondary-color)]'/>
                        )}
                     </div>
                     <div className='w-full h-fit flex flex-col gap-2 text-white items-end mb-8 pt-2'>
                        <h2 className='self-start font-bold font-inter text-[clamp(1.5rem,3vw,2rem)] text-[var(--text-color)]'>{service.name}</h2>
                        <p className='font-inter text-[clamp(1rem,1.5vw,1.5rem)] text-[var(--text-color)]'>{service.details}</p>
                        <RedirectButton label='Learn More' onClick={() => {}} />
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   )
}

export default Service