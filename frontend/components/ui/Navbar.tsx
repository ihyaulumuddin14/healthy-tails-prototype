'use client'

import MobileNav from './MobileNav'
import Hamburger from './Hamburger'
import ThemeToggle from './ThemeToggle'
import LinkNavbar from './LinkNavbar'
import ClientUserButton from './ClientUserButton'
import LinkHomeLogo from './LinkHomeLogo'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const Navbar = () => {
   const lastScrollY = useRef(0);
   const navbarRef = useRef<HTMLElement>(null);
   const pathName = usePathname();


   useEffect(() => {
      if (pathName.startsWith('/user') || pathName.startsWith('/admin')) return

      let ticking = false;

      const handleScrollDirection = () => {
         const scrollY = window.scrollY;

         if (scrollY > lastScrollY.current) {
            navbarRef.current!.style.transform = 'translateY(-100%)';
         } else {
            navbarRef.current!.style.transform = 'translateY(0)';
         }

         lastScrollY.current = scrollY;
         ticking = false;
      }

      const onScroll = () => {
         if (!ticking) requestAnimationFrame(handleScrollDirection);
         ticking = true; 
      }

      window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
      }
   }, [])

   return (
      <header ref={navbarRef} className="w-full flex justify-center fixed top-0 bg-[var(--color-background)] z-50 transition-all duration-400 ease-in-out">
         <MobileNav />

         <nav className="w-full max-w-[1536px] h-18 flex justify-between items-center px-5 lg:px-10 py-3">
            <LinkHomeLogo />

            <div className="flex items-center gap-5">
               <LinkNavbar />
               <ThemeToggle />
               <ClientUserButton />
               <Hamburger />
            </div>
         </nav>

      </header>
   )
}

export default Navbar