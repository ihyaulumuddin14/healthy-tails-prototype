'use client'

import { animate, inView } from 'motion/react'
import { useEffect, useState } from 'react';

type Props = {
   children?: React.ReactNode;
   className?: string;
}

export default function Stagger({ children, className = '' }: Props) {
   const [count, setCount] = useState(0);

   useEffect(() => {
      inView('.stagger-text', () => {
         animate(0, Number(children), {
            duration: 2,
            ease: 'circOut',
            onUpdate: (value) => {
               setCount(Math.round(value));
            }
         })
      }, { margin: '0% 0% 0% 0%' })
   }, [children])

   return (
      <span className={`${className} stagger-text`}>{count}+</span>
   )
}
