import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: "Loading"
}

export default function loading() {
   return (
      <section className='w-full h-screen flex flex-col justify-center items-center bg-transparent'>
         <video src="/animation/Loader cat.webm" autoPlay loop muted></video>
         <p className="text-[clamp(0.8rem,1.5vw,1rem)] text-[var(--color-foreground)] font-inter font-semibold">Wait a minute.. miaw</p>
      </section>
   )
}