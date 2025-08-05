'use client'

import { navbarLink } from '../../constant'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import BasicButton from '../../../components/ui/BasicButton'
import useStore from '@/stores/useStore'
import { handleFormResponse } from '@/app/(auth)/HandleFormResponse'
import { useAuthStore } from '@/hooks/useAuthStore'

const MobileNav = () => {
   const router = useRouter();
   const pathname = usePathname();
   const isMobileNavOpen = useStore((state) => state.isMobileNavOpen);
   const setIsMobileNavOpen = useStore((state) => state.setIsMobileNavOpen);
   const accessToken = useAuthStore((state) => state.accessToken);


   const handleLogout = async () => {
      await handleFormResponse({
         authType: 'logout',
         router
      })
   }

   const handleLogin = () => {
      router.push('/login')
   }

   return (
      <nav className={`w-full h-[calc(100vh-72px)] absolute overflow-y-auto transition-transform duration-600 ease-in-out ${isMobileNavOpen ? "translate-y-[72px]" : "translate-y-[-200%]"} left-0 z-[60] flex flex-col items-center justify-start bg-[var(--background)] p-5 pb-10`}>
         <ul className='w-full h-fit flex flex-col items-center justify-center mb-10'>
            {navbarLink.map((link, index) => (
               <Link
                  onClick={() => {setIsMobileNavOpen(false)}}
                  href={link.path}
                  key={index}
                  className={`
                  w-full py-3 px-5 text-left font-light ${index !== navbarLink.length - 1 ? "border-b border-[var(--color-tertiary)]/50" : ""} text-lg
                  ${link.path === pathname ? "text-[var(--color-tertiary)] " : "text-[var(--color-foreground)]"}
                  hover:text-[var(--color-tertiary)] active:text-[var(--color-tertiary)] hover:underline ease-in-out duration-300 transition-all
                     `}>
                     {link.name}
               </Link>
            ))}
         </ul>

         <div className='w-full h-fit flex flex-col items-center justify-center gap-5'>
            {accessToken ? (
               <div className='w-full h-fit flex justify-between items-center px-5 gap-5'>
                  <BasicButton model='fill' width='full' onClick={() => router.push('/profile')}>Profile</BasicButton>
                  <hr className='h-full border border-[var(--color-tertiary)]/40'/>
                  <BasicButton model='danger' width='full' onClick={handleLogout}>Logout</BasicButton>
               </div>
            ) : (
               <BasicButton model='fill' width='full' onClick={handleLogin}>Login</BasicButton>
            )}
         </div>
      </nav>
   )
}

export default MobileNav