'use client'
import Image from "next/image"
import Link from "next/link"

export default function LinkHomeLogo() {
   return (
      <Link href={"/home"} className="h-12 flex items-center gap-2 cursor-pointer">
         <Image src="/images/logo.webp" loading="eager" alt="logo" className="text-white" width={50} height={50}/>
         <h1 className='text-xl text-[var(--color-foreground)] font-bold tracking-tighter'>Healthy Tails</h1>
      </Link>
   )
}
