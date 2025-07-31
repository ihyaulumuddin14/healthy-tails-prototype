'use client'

import { useEffect, useState } from "react";

export default function Countdown () {
   const [count, setCount] = useState(0);
   
   useEffect(() => {
      const expireAt = Date.now() + ((5 * 60 * 1000))
      setCount(Math.floor(((expireAt as number) - Date.now()) / 1000));

      const interval = setInterval(() => {
         const secondsNow = Math.floor(((expireAt as number) - Date.now()) / 1000);

         if (secondsNow >= 0) {
            setCount(Math.floor(((expireAt as number) - Date.now()) / 1000));
         } else {
            clearInterval(interval);
         }
      }, 1000)

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="py-1 px-2 text-[var(--color-foreground)] border border-[var(--color-foreground)]/30 bg-red-900 rounded-sm">
         <time className="text-white">
            {(Math.floor(count / 60)).toString().padStart(2, '0')}
            {" "}:{" "}
            {(count % 60).toString().padStart(2, '0')}
         </time>
      </div>
   )
}