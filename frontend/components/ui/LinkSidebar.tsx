'use client'

import appStore from "@/stores/appStore"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { animate } from "motion/mini"
import { spring } from "motion"
import { sidebarUserLink, sidebarAdminLink } from "@/app/constant"
import { useNavigation } from "@/hooks/useNavigation"
import { Link } from "@/providers/nprogress/Link"

type Props = {
   type: 'user' | 'admin'
}

export default function LinkSidebar({ type }: Props) {
   const isSidebarOpen = appStore(state => state.isSidebarOpen)
   const pathName = usePathname();
   const { goReplace } = useNavigation();

   useEffect(() => {
      const mark = document.querySelector('.mark') as HTMLElement

      if (type === 'user') {
         sidebarUserLink.forEach((link, index) => {
            if (pathName === link.path) {
               animate(
                  mark,
                  { transform: `translateY(${index * 48}px)` },
                  { duration: 0.7, type: spring, bounce: 0.6 }
               )
            }
         })
      } else {
         sidebarAdminLink.forEach((link, index) => {
            if (pathName === link.path) {
               animate(
                  mark,
                  { transform: `translateY(${index * 48}px)` },
                  { duration: 0.7, type: spring, bounce: 0.6 }
               )
            }
         })
      }
   }, [pathName])


   return (
      <ul className="w-full h-fit relative">
         {/* marker */}
         <div className="mark absolute top-0 right-0 h-12 w-1 bg-[var(--color-tertiary)]"></div>

         {type === 'user' && sidebarUserLink.map((link, index) => (
            <Link key={index} onClick={() => goReplace(link.path)} className={`w-full flex justify-between items-center px-4 py-3 rounded-l-2xl relative hover:bg-[var(--color-tertiary)]/20 active:bg-[var(--color-tertiary)]/50 cursor-pointer`}>
               {link.icons}
               <span className={`text-sm text-[var(--color-foreground)] ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-200 ease-in-out absolute top-1/2 -translate-y-1/2 left-18 pointer-events-none whitespace-nowrap`}>{link.name}</span>
            </Link>
         ))}

         {type === 'admin' && sidebarAdminLink.map((link, index) => (
            <Link key={index} href={link.path} className={`w-full flex justify-between items-center px-4 py-3 rounded-l-2xl relative hover:bg-[var(--color-tertiary)]/20 active:bg-[var(--color-tertiary)]/50 cursor-pointer`}>
               {link.icons}
               <span className={`text-sm text-[var(--color-foreground)] ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-200 ease-in-out absolute top-1/2 -translate-y-1/2 left-18 pointer-events-none whitespace-nowrap`}>{link.name}</span>
            </Link>
         ))}
      </ul>
   )
}
