'use client'

import verifyStore from "@/stores/verifyStore";
import { useEffect, useState } from "react";

export default function Countdown() {
   const [count, setCount] = useState(0);
   const updatedAt = verifyStore((state) => state.updatedAt);

   useEffect(() => {
      const email = JSON.parse(sessionStorage.getItem('email') as string);
      const expireAt = Number(email.expireAt);

      setCount(Math.floor(((expireAt) - Date.now()) / 1000));

      const interval = setInterval(() => {
         const secondsNow = Math.floor(((expireAt) - Date.now()) / 1000);

         if (secondsNow >= 0) {
            setCount(Math.round(((expireAt) - Date.now()) / 1000));
         } else {
            clearInterval(interval);
         }
      }, 1000)

      return () => clearInterval(interval);
   }, [updatedAt]);

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