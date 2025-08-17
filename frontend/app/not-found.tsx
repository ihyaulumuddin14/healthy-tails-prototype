'use client'

import AnimateFillButton from "@/components/ui/AnimateFillButton";
import Link from "next/link";

export default function PageNotFound() {

   return (
      <section className='w-full h-screen flex flex-col justify-center items-center font-barriecito gap-4 p-[min(10vw,100px)]'>
         <h1 className='text-9xl font-bold flex items-center gap-1 mask-b-from-30% text-stroke'>404</h1>
         <p className='text-md sm:text-xl text-center text-[var(--color-foreground)]'>Ooopss! The page you are looking for does not exist!</p>
         <AnimateFillButton model='outline'>
            <Link href={'/'}>
               Back to Home
            </Link>
         </AnimateFillButton>
      </section>
   )
}