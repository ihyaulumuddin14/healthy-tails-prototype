'use client'

export default function ScrollDown() {
   return (
      <div
         onClick={() => scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
         className='z-1 absolute bottom-10 right-1/2 translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer'>
            <svg className="animate-pulse w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
            </svg>
            <span className='text-sm text-slate-100'>
               Scroll
            </span>
      </div>
   )
}
