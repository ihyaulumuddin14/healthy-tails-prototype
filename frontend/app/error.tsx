'use client'

import AnimateFillButton from "@/components/ui/AnimateFillButton"

export default function error({
   error,
   reset
}: {
   error: Error & {digest?: string},
   reset: () => void
}) {
   <section className='w-full h-screen flex flex-col justify-center items-center font-barriecito gap-4 p-[min(10vw,100px)]'>      <h1 className='text-9xl font-bold flex items-center gap-1 mask-b-from-70% text-stroke'>Something Went Wrong!</h1>
      <h1 className='text-9xl font-bold flex items-center gap-1 mask-b-from-70% text-stroke'>Something Went Wrong!</h1>
      <p className='text-md sm:text-xl text-center text-[var(--color-foreground)]'>Ooopss! Looks like we lost connection or something else. Please try and refresh the page</p>
      <AnimateFillButton model='outline' onClick={() => reset()}>
         Reset
      </AnimateFillButton>
   </section>
}
