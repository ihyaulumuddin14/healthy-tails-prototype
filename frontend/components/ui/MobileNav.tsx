'use client'

import { navbarLink } from '../../app/constant'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { onSubmitLogout } from '@/api/auth.actions'
import { useNavigation } from '@/hooks/useNavigation'
import { showErrorToast, showLoadingToast, showSuccessToast } from '@/helpers/toastHelper'
import { Link } from '@/providers/nprogress/Link'
import AnimateFillButton from './AnimateFillButton'
import appStore from '@/stores/appStore'
import useUser from '@/hooks/useUser'
import api from '@/lib/axiosInstance'
import { userStore } from '@/stores/userStore'

const MobileNav = () => {
   const pathname = usePathname();
   const { goReplace, goPush } = useNavigation();
   const { user } = useUser();
   const setUser = userStore((state) => state.setUser);
   const isMobileNavOpen = appStore((state) => state.isMobileNavOpen);
   const setIsMobileNavOpen = appStore((state) => state.setIsMobileNavOpen);

   const handleLogout = async () => {
      showLoadingToast('Logging out...');
      const response = await onSubmitLogout();

      if (response.success) {
         showSuccessToast(response.message as string);

         delete api.defaults.headers.common['Authorization'];
         goReplace('/home');
         setUser(null);
      } else {
         showErrorToast(response.error as string);
      }
      setIsMobileNavOpen(false)
   }

   const handleProfile = () => {
      setIsMobileNavOpen(false)
      if (user?.role === 'ADMIN') {
         goPush('/admin/dashboard')
      } else if (user?.role === 'USER') {
         goPush('/user/profile')
      }
   }

   const handleLogin = () => {
      setIsMobileNavOpen(false)
      goPush('/login')
   }

   useEffect(() => {
      return () => setIsMobileNavOpen(false)
   }, [])

   return (
      <nav className={`w-full h-[calc(100vh-72px)] absolute overflow-y-auto transition-transform duration-600 ease-in-out ${isMobileNavOpen ? "translate-y-[72px]" : "translate-y-[-200%]"} left-0 z-[60] flex flex-col items-center justify-start bg-[var(--background)] p-5 pb-10`}>

         {user && (
            <div className='w-full h-fit flex justify-start items-center px-3 py-3 border-b-1 border-[var(--color-foreground)]/20 hover:bg-[var(--color-tertiary)]/10 active:bg-[var(--color-tertiary)]/20 cursor-pointer' onClick={handleProfile}>
               <svg className="w-10 h-10 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
               </svg>
               <div className='w-fit h-fit ml-3 flex flex-col justify-center'>
                  <h2 className='text-lg font-semibold'>{user?.name}</h2>
                  <p className='text-sm font-extralight opacity-50'>{user?.email}</p>
               </div>
            </div>
         )}

         <ul className='w-full h-fit flex flex-col items-center justify-center mb-10'>
            {navbarLink.map((link, index) => (
               <Link
                  onClick={() => { setIsMobileNavOpen(false) }}
                  href={link.path}
                  key={index}
                  className={`
                     w-full py-3 px-5 text-left font-light text-lg flex gap-3 items-center
                     ${link.path === pathname ? "text-[var(--color-tertiary)] fill-[var(--color-tertiary)]" : "text-[var(--color-foreground)] fill-[var(--color-foreground)]"}
                     hover:text-[var(--color-tertiary)] hover:fill-[var(--color-tertiary)] active:text-[var(--color-tertiary)] active:fill-[var(--color-tertiary)] hover:underline ease-in-out duration-300 transition-all
                     `}>
                  {link.icons}
                  {link.name}
               </Link>
            ))}
         </ul>

         <div className='w-full h-fit flex flex-col items-center justify-center gap-5'>
            {user ? (
               <AnimateFillButton model='danger' width='full' onClick={handleLogout}>Logout</AnimateFillButton>
            ) : (
               <AnimateFillButton model='fill' width='full' onClick={handleLogin}>Login</AnimateFillButton>
            )}
         </div>
      </nav>
   )
}

export default MobileNav