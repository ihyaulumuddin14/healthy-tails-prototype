'use client'

import { navbarLink } from '@/app/constant'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'


export default function LinkNavbar() {
   const pathname = usePathname();

   return (
      <ul className="hidden lg:flex items-center mr-10">
         {navbarLink.map((link, index) => (
            <Link
               href={link.path}
               key={index}
               className="group relative flex items-center text-sm font-inter px-10">
                  <span className={`group-hover:text-[var(--color-tertiary)] ease-in-out duration-300`}>{link.name}</span>
                  <hr className={`absolute right-0 bottom-0 bg-[var(--color-tertiary)] border-0 group-hover:w-full group-hover:h-0.5 ${pathname === link.path ? 'w-full h-0.5' : 'w-0.5 h-6'} ease-in-out duration-300`}/>
            </Link>
         ))}
      </ul>
   )
}
