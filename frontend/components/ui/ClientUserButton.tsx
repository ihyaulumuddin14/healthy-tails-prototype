'use client'

import AnimateFillButton from './AnimateFillButton'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from '@/hooks/useNavigation';
import useUser from '@/hooks/useUser';
import { onSubmitLogout } from '@/api/auth.actions';
import { showErrorToast, showLoadingToast, showSuccessToast } from '@/helpers/toastHelper';
import api from '@/lib/axiosInstance';
import { userStore } from '@/stores/userStore';
import Image from "next/image";
import ImageDefault from '@/public/images/default_avatar.png'

export default function ClientUserButton() {
   const { user } = useUser();

   return (
      <>
         {user ? (<ProfileDropdown />) : (<LoginButton />)}
      </>
   )
}

function LoginButton() {
   const { goPush } = useNavigation();
   const handleLogin = () => goPush('/login')

   return (
      <div className="hidden lg:flex items-center gap-3">
         <AnimateFillButton model="fill" onClick={handleLogin}>Login</AnimateFillButton>
      </div>
   )
}


function ProfileDropdown() {
   const [isOpen, setIsOpen] = useState(false);
   const ProfileDropdownRef = useRef<HTMLDivElement>(null);
   const { user } = useUser();
   const setUser = userStore((state) => state.setUser);
   const { goReplace } = useNavigation();

   useEffect(() => {
      const handleClick = (e: MouseEvent) => {
         if (ProfileDropdownRef.current && !ProfileDropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
         } else {
            setIsOpen(!isOpen);
         }
      }

      document.addEventListener('click', (e) => handleClick(e))

      return () => document.removeEventListener('click', (e) => handleClick(e))
   }, [isOpen])


   const handleLogout = async () => {
      showLoadingToast('Logging out...');
      const response = await onSubmitLogout();

      if (response.success) {
         showSuccessToast(response.message as string);

         delete api.defaults.headers.common['Authorization'];
         setUser(null);
         goReplace('/home');
      } else {
         showErrorToast(response.error as string);
      }
   }

   return (
      <div className="hidden lg:flex items-center gap-3">
         <div ref={ProfileDropdownRef} className="wrapper w-10 h-fit relative font-inter" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center justify-center rounded-full overflow-hidden cursor-pointer aspect-square h-[45px]">
               <Image src={user.photoUrl ? user.photoUrl : ImageDefault} alt="profile photo" width={100} height={100} loading='eager' className='w-full aspect-square object-cover object-top' />
            </div>

            <div className={`w-fit h-fit absolute right-0 mt-2 text-[var(--color-foreground)] grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ease-in-out duration-200`}>
               <div className={`w-[max-content] h-full overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"} ease-in-out duration-500 rounded-md shadow-lg  border border-border`}>
                  <ul className="h-fit flex flex-col items-end bg-[var(--color-background)] p-1 text-sm">
                     <li className='w-full h-fit flex justify-start items-center px-3 py-3 border-b-1 border-[var(--color-foreground)]/20 pointer-events-none'>
                        <svg className="w-8 h-8 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                        </svg>
                        <div className='w-fit h-fit ml-3 flex flex-col justify-center'>
                           <h2 className='text-md font-semibold'>{user?.name}</h2>
                           <p className='text-xs font-light opacity-50'>{user?.email}</p>
                        </div>
                     </li>
                     <Link
                        href={`${user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/profile'}`}
                        className="py-2 px-4 w-full flex justify-center hover:text-[var(--color-foreground)]/70 font-semibold cursor-pointer ease-in-out duration-150">
                        My Profile
                     </Link>
                     <li
                        onClick={handleLogout}
                        className="py-2 px-4 w-full flex justify-center text-red-600 hover:text-red-600/70 font-semibold cursor-pointer ease-in-out duration-150">
                        Logout
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}