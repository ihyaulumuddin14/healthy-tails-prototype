import React from 'react'
import MagneticButton from './MagneticButton'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollToPlugin)

type FooterProps = {
   sectionIDs : string[]
}

const Footer = ({ sectionIDs }: FooterProps) => {

   const scrollToSection = (sectionID: string) => {
      gsap.to(window, {
         duration: 1.5,
         scrollTo: {
            y: `#${sectionID}`,
            offsetY: 100
         },
         ease: 'power1.inOut'
      })
   }

   useGSAP(() => {
      const timeline = gsap.timeline({
         scrollTrigger: {
            trigger: '.footer-wrapper',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
         }
      });

      timeline.from('.footer-content', {
         scale: 0.5,
         yPercent: -100,
         duration: 0.5,
         ease: 'power1.inOut'
      })
   })

   return (
      <section className='footer-wrapper w-full h-fit flex justify-center items-center bg-[var(--tertiary-color)] relative z-1 border overflow-hidden mask-t-from-90% pt-20'>
         <div className='footer-content w-full max-w-[1536px] h-fit items-center p-[min(7vw,100px)] grid lg:grid-cols-2 grid-cols-1 gap-10'>
            {/* left */}
            <div className='w-full h-fit flex flex-col gap-5'>
               <div className='w-full h-fit flex items-center gap-2 cursor-pointer' onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img src="images/logo.webp" alt="logo" className='w-[70px]'/>
                  <h2 className='font-inter text-slate-700 text-[clamp(1.5rem,5vw,2rem)] font-bold'>Healthy Tails</h2>
               </div>
               <address className='font-inter text-slate-700 text-[clamp(0.8rem,1.5vw,1rem)]'>
                  Green Living Residence M17, Jl. Satsui Tubun, Gadang,<br />
                  Kec. Sukun, Kota Malang,<br />
                  Jawa Timur<br />
                  65149
               </address>

               <div className='flex justify-start items-center w-full max-w-[300px] h-fit gap-5'>
                  <MagneticButton type='fill' link='' contrast={true}>Book a Visit</MagneticButton>
                  <MagneticButton type='fill' link='' contrast={true}>Contact Us</MagneticButton>
               </div>
            </div>

            {/* right */}
            <div className='w-full h-fit grid lg:grid-cols-2 grid-cols-1 gap-5'>
               {/* information */}
               <div className='w-full h-fit flex flex-col gap-5'>
                  <h3 className='font-inter text-slate-700 text-[clamp(1.5rem,5vw,2rem)] font-bold'>Information</h3>

                  <ul className='w-full h-fit flex flex-col gap-2'>
                     {sectionIDs.map((section, index) => (
                        <li
                           onClick={() => scrollToSection(section)}
                           className='font-inter text-slate-700 text-[clamp(0.8rem,1.5vw,1rem)] cursor-pointer hover:scale-110 ease-in-out duration-200'
                           key={index}>
                              {section.charAt(0).toUpperCase() + section.slice(1)}
                        </li>
                     ))}
                  </ul>
               </div>

               {/* social media */}
               <div className='w-full h-fit flex flex-col gap-5'>
                  <h3 className='font-inter text-slate-700 text-[clamp(1.5rem,5vw,2rem)] font-bold'>Social Media</h3>

                  <ul className='w-full h-fit flex flex-col gap-2'>
                     <SocialMediaLink name='WhatsApp' link='#'>
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd"/>
                           <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                        </svg>
                     </SocialMediaLink>
                     <SocialMediaLink name='Instagram' link='#'>
                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                        </svg>
                     </SocialMediaLink>
                  </ul>
               </div>
            </div>

            <p className='font-inter text-slate-700 text-[clamp(0.8rem,1.5vw,1rem)]'>Copyright &copy; Ihya' Ulumuddin 2025. All rights reserved</p>
         </div>
      </section>
   )
}

export default Footer

type SocialMediaLinkProps = {
   children: React.ReactNode,
   name: string,
   link: string
}

const SocialMediaLink = ({ children, name, link }: SocialMediaLinkProps) => {
   return (
      <a
         href={link}
         className='font-inter text-slate-700 text-[clamp(0.8rem,1.5vw,1rem)] cursor-pointer flex gap-2 font-semibold hover:scale-110 ease-in-out duration-200'>
            {children} {name}
      </a>
   )
}