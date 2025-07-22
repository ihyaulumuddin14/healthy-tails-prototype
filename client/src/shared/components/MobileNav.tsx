import React from 'react'
import { navbarLink } from '../constants/constant'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import useStore from '../hooks/useStore'
import ThemeToggle from './ThemeToggle'
import toast from 'react-hot-toast'

type Props = {
   isOpen: boolean
}

const MobileNav = ({ isOpen }: Props) => {
   const location = useLocation();
   const user = useStore((state) => state.user);
   const setUser = useStore((state) => state.setUser);

   const handleLogout = async () => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
         })
   
         const data = await response.json();
         
         if (!response.ok) throw new Error(data.error);

         setUser(null);
         toast.dismiss();
         toast.success(data.message, { duration: 2000 });

         setTimeout(() => {
            window.location.href = "/";
         }, 2000)
      } catch (error) {
         toast.dismiss();
         toast.error((error as Error).message);
      }
   }

   return (
      <nav className={`w-full max-h-[1536px] h-[100dvh] absolute transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[80px]" : "translate-y-[-100%]"} left-0 z-[60] flex flex-col items-center justify-start bg-[var(--primary-color)] p-5 pb-10`}>
         <ul className='w-full h-fit flex flex-col items-center justify-center mb-10'>
            {navbarLink.map((link, index) => (
               <Link
                  to={link.path}
                  key={index}
                  className={`
                  w-full py-3 px-5 text-left font-inter font-extralight ${index !== navbarLink.length - 1 ? "border-b border-[var(--tertiary-color)]/50" : ""}
                  text-lg ${location.pathname.includes(link.path) ? "text-[var(--tertiary-color)]" : "text-[var(--text-color)]"}
                  hover:text-[var(--tertiary-color)] active:text-[var(--tertiary-color)] hover:underline ease-in-out duration-300 transition-all
                     `}>
                     {link.name}
               </Link>
            ))}
         </ul>

         <div className='w-full h-fit flex flex-col items-center justify-center gap-5'>
            <div className='w-full h-fit flex justify-start items-center px-5'>
               <ThemeToggle />
            </div>
            {user ? (
               <div className='w-full h-fit flex justify-center items-center'>
                  <MagneticButton type='fill' link='/user'>Profile</MagneticButton>
                  <MagneticButton type='outline' onClick={handleLogout}>Logout</MagneticButton>
               </div>
            ) : (
               <MagneticButton type='fill' link='/login'>Login</MagneticButton>
            )}
         </div>
      </nav>
   )
}

export default MobileNav