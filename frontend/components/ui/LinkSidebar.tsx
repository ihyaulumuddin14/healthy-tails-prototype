'use client'

import useStore from "@/stores/useStore"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { animate } from "motion/mini"
import { spring } from "motion"
import path from "path"

const sidebarUserLink = [
   {
      name: 'Account Info',
      path: '/user/profile/info',
      icons: <svg className="w-6 h-6 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/></svg>
   },
   {
      name: 'Change Password',
      path: '/user/profile/password',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M3.433 17.325 3.079 19.8a1 1 0 0 0 1.131 1.131l2.475-.354C7.06 20.524 8 18 8 18s.472.405.665.466c.412.13.813-.274.948-.684L10 16.01s.577.292.786.335c.266.055.524-.109.707-.293a.988.988 0 0 0 .241-.391L12 14.01s.675.187.906.214c.263.03.519-.104.707-.293l1.138-1.137a5.502 5.502 0 0 0 5.581-1.338 5.507 5.507 0 0 0 0-7.778 5.507 5.507 0 0 0-7.778 0 5.5 5.5 0 0 0-1.338 5.581l-7.501 7.5a.994.994 0 0 0-.282.566zM18.504 5.506a2.919 2.919 0 0 1 0 4.122l-4.122-4.122a2.919 2.919 0 0 1 4.122 0z"></path></svg>
   },
   {
      name: 'My Pets',
      path: '/user/profile/pets',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
   },
   {
      name: 'Appointments',
      path: '/user/profile/appointments',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path><path d="M7 9h10v2H7zm0 4h5v2H7z"></path></svg>
   },
   {
      name: 'Live Queue',
      path: '/user/profile/queue',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path><path d="M12 9c-1.627 0-3 1.373-3 3s1.373 3 3 3 3-1.373 3-3-1.373-3-3-3z"></path></svg>
   }
]

const sidebarAdminLink = [
   {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M19 10H5c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2zM5 20v-8h14l.002 8H5zM5 6h14v2H5zm2-4h10v2H7z"></path></svg>
   },
   {
      name: 'Clients',
      path: '/admin/clients',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-6 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path></svg>
   },
   {
      name: 'Pets',
      path: '/admin/pets',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76 1.57 1.57 0 0 0 .09-.23 4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"></path><path d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5 3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"></path></svg>
   },
   {
      name: 'Medical Records',
      path: '/admin/records',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path></svg>
   },
   {
      name: 'Configures',
      path: '/admin/configures',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V8c0-1.103-.897-2-2-2h-6.655L8.789 4H4c-1.103 0-2 .897-2 2v13h.007a1 1 0 0 0 .158.551zM18 8v3H6c-.4 0-.762.238-.919.606L4 14.129V8h14z"></path></svg>
   },
   {
      name: 'Settings',
      path: '/admin/settings',
      icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}}><path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path></svg>
   }
]

type Props = {
   type: 'user' | 'admin'
}

export default function LinkSidebar({ type }: Props) {
   const isSidebarOpen = useStore(state => state.isSidebarOpen)
   const pathName = usePathname();

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
            <Link key={index} href={link.path} className={`w-full flex justify-between items-center px-4 py-3 relative hover:bg-[var(--color-tertiary)]/20`}>
               {link.icons}
               <span className={`text-sm text-[var(--color-foreground)] ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-200 ease-in-out absolute top-1/2 -translate-y-1/2 left-18 pointer-events-none whitespace-nowrap`}>{link.name}</span>
            </Link>
         ))}

         {type === 'admin' && sidebarAdminLink.map((link, index) => (
            <Link key={index} href={link.path} className={`w-full flex justify-between items-center px-4 py-3 relative hover:bg-[var(--color-tertiary)]/20`}>
               {link.icons}
               <span className={`text-sm text-[var(--color-foreground)] ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-200 ease-in-out absolute top-1/2 -translate-y-1/2 left-18 pointer-events-none whitespace-nowrap`}>{link.name}</span>
            </Link>
         ))}
      </ul>
   )
}
