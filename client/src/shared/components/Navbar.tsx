import { useEffect, useState } from "react"
import { navbarLink } from "../constants/constant";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Hamburger from "./Hamburger";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";


type NavbarProps = {
   isHome: boolean
}

const Navbar = ({ isHome = false }: NavbarProps) => {
   const [isLeaveHero, setIsLeaveHero] = useState(false);
   const [scrollY, setScrollY] = useState(0);
   const location = useLocation();

   useEffect(() => {
      const handleScroll = () => {
         const newScrollY = window.scrollY;

         if (newScrollY > scrollY) {
            gsap.to('nav', {
               y: '-100%',
               duration: 0.5,
               ease: 'power3.inOut',
            })
         } else {
            gsap.to('nav', {
               y: '0%',
               duration: 0.5,
               ease: 'power3.inOut',
            })
         }

         setScrollY(newScrollY);
      }

      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
   }, [scrollY])

   useEffect(() => {
      
      const handleScroll = () => {
         const scrollY = window.scrollY;

         if (isHome && scrollY >= 100) {
            setIsLeaveHero(true);
         } else {
            setIsLeaveHero(false);
         }
      }

      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
   }, [isHome])

   useGSAP(() => {
      document.fonts.ready.then(() => {
         const heroText = new SplitText('nav h1', { type: 'words' });
   
         if (isHome && !isLeaveHero) {
            gsap.from(heroText.words, {
               y: 20,
               opacity: 0,
               duration: 1,
               ease: 'expo.inOut',
               stagger: 0.1
            })
         }
      })
   }, []);

   return (
      <nav className="w-full flex justify-center fixed top-0 bg-white/10 z-50 backdrop-brightness-50 backdrop-blur-xl">
         <div className="w-full max-w-[1536px] h-20 flex justify-between items-center px-5 py-3 ">
            <div className="h-12 flex items-center gap-2 relative">
               <img src="/images/logo.webp" alt="logo" className="h-full text-white"/>
               <h1 className={`
                  text-xl text-slate-100 w-[max-content]
                  font-inter font-bold tracking-tighter absolute top-1/2 -translate-y-1/2 origin-left
                  ${isLeaveHero && isHome ? "left-15" : "top-40 left-5 sm:left-8 scale-200 sm:scale-300 lg:scale-500"}
                  ease-in-out duration-500 `}>
                     Healthy Tails
               </h1>
            </div>

            <div className="flex items-center gap-20">
               <ul className="hidden lg:flex items-center">
                  {navbarLink.map((link, index) => (
                     <NavLink 
                        to={link.path}
                        key={index}
                        className="group relative flex items-center text-sm font-inter px-10">
                           <span
                              className={`group-hover:text-[var(--tertiary-color)]
                              ${location.pathname === link.path ? "text-[var(--tertiary-color)]" : "text-slate-100"}
                              ease-in-out duration-300`}>
                                 {link.name}
                           </span>
                           <hr className="absolute right-0 bottom-0 w-0.5 h-6 bg-[var(--tertiary-color)] border-0 group-hover:w-full group-hover:h-0.5 ease-in-out duration-300"/>
                     </NavLink>
                  ))}
               </ul>

               <div className="hidden lg:flex items-center gap-5">
                  <ThemeToggle />

                  <NavLink to={'/user'}>
                     <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                     </svg>
                  </NavLink>
               </div>

               <Hamburger />
            </div>
         </div>
      </nav>
   )
}

export default Navbar