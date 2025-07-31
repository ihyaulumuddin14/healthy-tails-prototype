'use client'

import { useEffect, useState } from 'react'
import { serviceLists } from '@/app/constant'
import Image from 'next/image';

const sections = serviceLists.map(section => section.articles.id);

const Articles = () => {
   const [active, setActive] = useState("");

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

   return (
      <section className='w-full h-fit flex justify-center items-center bg-[var(--color-background)]/70 pt-20 mask-t-from-95%'>
         <div className='w-full max-w-[1536px] h-full grid grid-cols-1 md:grid-cols-[1fr_2fr] px-[min(3vw,100px)] py-10 items-start justify-center gap-0 text-[var(--color-foreground)]'>
            <aside className='w-full h-fit md:sticky top-30 rounded-xl p-5 bg-[var(--color-foreground)]/5 shadow-md backdrop-blur-2xl'>
               <h2 className='text-2xl font-semibold font-inter mb-2'>Our Service</h2>
               <hr className='opacity-20'/>
               <ol className='w-full fit flex flex-col items-start mt-2'>
                  {serviceLists.map((service, index) => (
                     <a
                        key={index}
                        href={`#${service.articles.id}`}
                        className={`block w-full py-2 px-5 rounded-md text-sm font-inter cursor-pointer hover:opacity-80 ${active === service.articles.id ? "bg-[var(--color-accent)] text-black shadow-md" : "bg-transparent"} ease-in-out duration-300`}>
                           {index + 1}. {service.name}
                     </a>
                  ))}
               </ol>
            </aside>
            
            <div className='w-full h-fit p-[min(7vw,50px)] flex flex-col items-center gap-10 text-[var(--color-foreground)]'>
               {serviceLists.map((service, index) => (
                  <section className='w-full h-fit' id={service.articles.id} key={index}>
                     <h1 className='text-4xl font-bold font-inter mb-5'>{service.name}</h1>
                     <em className='text-md font-inter font-extralight'>{service.articles.subtitle}</em>

                     <figure className='w-full h-fit flex flex-col items-center justify-center my-5 rounded-2xl overflow-hidden'>
                        <Image src={service.articles.image} alt={service.name} width={500} height={250} className='w-full h-full max-h-[500px] object-cover object-bottom'/>
                        <figcaption className='w-full h-fit text-center p-1 font-inter font-extralight text-xs'>{service.name}</figcaption>
                     </figure>

                     <p className='text-lg font-inter font-light'>{service.articles.content}</p>

                     {index !== serviceLists.length - 1 && <hr className='w-full border-[var(--color-foreground)]/20 my-10' />}
                  </section>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Articles