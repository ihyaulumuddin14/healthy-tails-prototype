'use client'

import { sliderImageLists } from "@/app/constant"
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";
import { wrap } from "@motionone/utils";
import Image from "next/image"

export default function VelocitySlider({initDirection}: {initDirection: string}) {

   const baseX = useMotionValue(0);
   const { scrollY } = useScroll();
   const scrollVelocity = useVelocity(scrollY);
   const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
   });
   const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
   });

   const x = useTransform(baseX, (v) => `${wrap((initDirection === "left" ? -50 : 0), (initDirection === "left" ? 0 : 50), v)}%`);
   const directionFactor = useRef<number>(1);
   useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * (initDirection === "left" ? -2 : 2) * (delta / 1000);

      if (velocityFactor.get() < 0) {
         directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
         directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
  });


   return (
      <div className={`velocity-slider w-full max-w-[1900px] top-20 overflow-hidden mask-x-from-90% py-2 flex ${initDirection === "left" ? "justify-start" : "justify-end"} opacity-60`}>
         <motion.div className={`${initDirection === "left" ? "pr-5 sm:pr-10" : "pl-5 sm:pl-10"} scroller flex gap-5 sm:gap-10`} style={{x}}>
            {sliderImageLists.concat(sliderImageLists).map((image, index) => (
               <div key={index} className="w-[75px] sm:w-[150px] aspect-square overflow-hidden rounded-full text-[var(--foreground)] shrink-0">
                  <Image src={image.url} width={150} height={150} alt="cat image" loading="lazy" className="object-cover object-top h-full w-full" />
               </div>
            ))}
         </motion.div>
      </div>
   )
}
