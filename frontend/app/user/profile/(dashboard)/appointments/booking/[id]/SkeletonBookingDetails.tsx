import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SkeletonBookingDetails() {
   return (
      <section className="w-full h-fit md:max-h-[300px] grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_0.5fr] gap-10 lg:gap-2 relative">
         <Skeleton className="w-full h-full border border-border rounded-4xl p-[min(6vw,40px)] items-center flex flex-col gap-5" />

         <div className="details w-full overflow-auto h-fit md:max-h-[300px] relative">
            <nav className="sticky top-0 px-5 w-full flex justify-start gap-3">
               <Skeleton className='w-25 h-9 rounded-md'/>
               <Skeleton className='w-25 h-9 rounded-md'/>
            </nav>
            <main className="w-full h-fit px-5 pt-3">
                  <div className="w-full h-full p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                     {/* left */}
                     <div className="w-full flex flex-col gap-3">
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                     </div>

                     {/* center */}
                     <div className="w-full flex flex-col gap-3">
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                     </div>

                     {/* right */}
                     <div className="w-full flex flex-col gap-3">
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                           <Skeleton className='w-1/3 h-3'/>
                           <Skeleton className='w-1/2 h-5'/>
                        </div>
                     </div>
                  </div>
            </main>
         </div>

         <div className="w-full h-fit lg:h-[300px] flex items-end justify-center">
            <Skeleton className='w-1/2 h-10'/>
         </div>
      </section>
   )
}
