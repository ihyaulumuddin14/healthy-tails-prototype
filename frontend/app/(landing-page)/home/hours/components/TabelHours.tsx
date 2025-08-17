'use client'

import { useEffect, useState } from "react";
import { openHours } from "@/app/constant";
import AnimateFillButton from "@/components/ui/AnimateFillButton";

export default function TabelHours() {

   const [day, setDay] = useState('');
   const [seeAll, setSeeAll] = useState(false);

   useEffect(() => {
      const now = new Date();
      const dayNow = now.toLocaleDateString('en-US', { weekday: 'long' });

      setDay(dayNow);
   }, [])

   return (
      <div className='w-full max-w-2xl h-fit flex flex-col items-end'>
         {openHours.filter(schedule => schedule.day === day).map((schedule, index) => (
            HourList({ day: schedule.day, open: schedule.open, close: schedule.close, index, special: true })
         ))}

         {/* list open hours in a week */}
         <div className={`w-full h-fit grid ${seeAll ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}  ease-in-out duration-500 overflow-hidden mb-2`}>
            <div className='w-full h-fit flex justify-center items-center overflow-hidden'>
               <HoursList />
            </div>
         </div>

         <AnimateFillButton model="fill" width='auto' type="button" onClick={() => setSeeAll(!seeAll)} >
            {seeAll ? "See Less" : "See All"}
         </AnimateFillButton>
      </div>
   )
}



function HoursList() {
   return (
      <ul className='w-full h-fit flex flex-col items-center'>
         {openHours.map((schedule, index) => (
            <li key={index} className='w-full h-fit'>
               <HourList day={schedule.day} open={schedule.open} close={schedule.close} index={index} />
            </li>
         ))}
      </ul>
   )
}


type HourListProps = {
   day: string,
   open: string,
   close: string,
   index: number,
   special?: boolean
}

function HourList({ day, open, close, index, special = false }: HourListProps) {
   return (
      <div key={index} className={`w-full h-fit flex items-center justify-between rounded-lg p-5 ${special ? "border border-[var(--color-tertiary)] bg-[var(--color-foreground)]/20" : ""} ${index !== openHours.length - 1 ? "border-b border-[var(--color-tertiary)]" : ""}`}>
         <span className='flex items-center gap-2'>
            <p className='text-[clamp(1.5rem,3vw,2rem)] font-bold font-inter text-[var(--color-foreground)]'>{day}</p>
            {special && (
               <p className='py-2 px-3 text-[clamp(0.5rem,1.5vw,1rem)] font-inter text-slate-900 bg-[var(--color-tertiary)] rounded-2xl'>now</p>
            )}
         </span>
         <span className='text-[var(--color-foreground)] flex gap-2'>
            <time dateTime={open}>{open}</time>
            :
            <time dateTime={close}>{close}</time>
         </span>
      </div>
   )
}