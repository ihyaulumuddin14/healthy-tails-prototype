import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

type Props = {
   type: "fill" | "outline",
   children: React.ReactNode,
   link?: string,
   onClick?: () => void,
   contrast?: boolean
}

const BasicButton = ({ type, children, link, contrast }: Props) => {
   const btnRef = useRef<HTMLButtonElement>(null);
   const labelRef = useRef<HTMLSpanElement>(null);
   const navigate = useNavigate();

   useGSAP(() => {
      let isHovered = false;
      let mouseX = 0;
      let mouseY = 0;
      let currentBtnX = 0;
      let currentBtnY = 0;
      let currentLabelX = 0;
      let currentLabelY = 0;

      if (btnRef.current && labelRef.current) {
         const setBtnX = gsap.quickSetter(btnRef.current, 'x', 'px');
         const setBtnY = gsap.quickSetter(btnRef.current, 'y', 'px');
   
         const setLabelX = gsap.quickSetter(labelRef.current, 'x', 'px');
         const setLabelY = gsap.quickSetter(labelRef.current, 'y', 'px');
   
         btnRef.current.addEventListener('mousemove', (e: MouseEvent) => {
            if (btnRef.current) {
               const rect = btnRef.current.getBoundingClientRect();
               mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
               mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
            }
         });

         btnRef.current.addEventListener('mouseenter', () => {
            isHovered = true;

            gsap.from(labelRef.current, {
               xPercent: -50,
               x: 0,
               y: 0,
               duration: 0,
               ease: "power3.out"
            })

            gsap.to(btnRef.current, {
               duration: 0.1,
               ease: 'power3.inOut'
            })
         })

         btnRef.current.addEventListener('mouseleave', () => {
            isHovered = false;

            gsap.to(btnRef.current, {
               x: 0,
               y: 0,
               duration: 0.5,
               ease: "power3.out"
            })

            gsap.to(labelRef.current, {
               xPercent: -50,
               x: 0,
               y: 0,
               duration: 0.5,
               ease: "power3.out"
            })
         })

         const animate = () => {
            if (isHovered) {
               const targetBtnX = mouseX * 8;
               const targetBtnY = mouseY * 8;

               currentBtnX += (targetBtnX - currentBtnX) * 0.08;
               currentBtnY += (targetBtnY - currentBtnY) * 0.08;

               setBtnX(currentBtnX);
               setBtnY(currentBtnY);

               const targetLabelX = mouseX * 20;
               const targetLabelY = mouseY * 20;

               currentLabelX += (targetLabelX - currentLabelX) * 0.12;
               currentLabelY += (targetLabelY - currentLabelY) * 0.12;

               setLabelX(currentLabelX);
               setLabelY(currentLabelY);
            }

            requestAnimationFrame(animate);
         }

         animate();
      }
   })

   return (
      <button ref={btnRef} onClick={() => link && navigate(link)} className={`
         w-full max-w-[300px] rounded-2xl py-7 cursor-pointer relative shadow-lg shadow-[color:--text-color]
         ${type === "outline" ?
            "bg-transparent border border-[var(--text-color)] text-[var(--text-color)] "
            :
            "bg-[var(--tertiary-color)] text-black"}
         ${contrast ? "bg-white text-black" : ""}
         `}>
            <span
               ref={labelRef}
               className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex gap-2 justify-center'>
                  {children}
            </span>
      </button>
   )
}

export default BasicButton