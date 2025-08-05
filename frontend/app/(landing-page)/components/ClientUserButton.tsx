'use client'
import { useAuth } from '@/hooks/useAuth'
import BasicButton from '../../../components/ui/BasicButton'
import { useRouter } from 'next/navigation'


export default function ClientUserButton() {
   const router = useRouter();
   const accessToken = useAuth((state) => state.accessToken);
   const [isLoading, setIsLoading] = useState(true);
   const setUser = useAuth((state) => state.setUser);

   useEffect(() => {
      const getUserData = async () => {
         try {
            const response = await api.get('/users/me');

            setUser(response.data.user);
         } catch (error) {
            let errorMessage = 'An error occurred while fetching user data. Please try again.'
   
            if (axios.isAxiosError(error)) {
               const axiosError = error as AxiosError<{ message: string }>;
               errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
            }
            
            toast.error(errorMessage)
         } finally {
            setIsLoading(false);
         }
      }

      getUserData();
   }, [])

   const handleLogin = () => {
      router.push('/login')
   }

   if (isLoading) return (
      <div className='hidden lg:flex items-center gap-3'>
         <Loader />
      </div>
   )

   return (
      <div className="hidden lg:flex items-center gap-3">
         {(accessToken !== null) ? (
            <ProfileDropdown />
         ) : (
            <BasicButton model="fill" onClick={handleLogin}>Login</BasicButton>
         )}
      </div>
   )
}





import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { handleFormResponse } from '@/app/(auth)/HandleFormResponse'
import Loader from '@/components/ui/Loader';
import api from '@/lib/axiosInstance';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';


function ProfileDropdown() {
   const [isOpen, setIsOpen] = useState(false);
   const ProfileDropdownRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

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
      await handleFormResponse({
         authType: 'logout',
         router
      })
   }

   return (
      <div ref={ProfileDropdownRef} className="wrapper w-10 h-fit relative font-inter" onClick={() => setIsOpen(!isOpen)}>
         <div className="flex items-center justify-center cursor-pointer">
            <svg className="w-10 h-10 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
               <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
            </svg>
         </div>

         <div className={`w-fit h-fit absolute right-0 mt-2 text-[var(--color-foreground)] grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ease-in-out duration-200`}>
            <div className={`w-[max-content] h-full overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"} ease-in-out duration-500 rounded-md shadow-lg`}>
               <ul className="h-fit flex flex-col items-end bg-[var(--color-background)] p-1 text-sm">
                  <Link href="/profile" className="py-2 px-4 w-full flex justify-end rounded-md bg-[var(--color-background)] hover:bg-[var(--color-foreground)]/50 cursor-pointer ease-in-out duration-150">My Profile</Link>
                  <li onClick={handleLogout} className="py-2 px-4 w-full flex justify-end rounded-md bg-[var(--color-background)] text-red-600 hover:bg-red-100 cursor-pointer ease-in-out duration-150">Logout</li>
               </ul>
            </div>
         </div>
      </div>
   )
}