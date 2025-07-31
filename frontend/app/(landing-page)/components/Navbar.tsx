import Image from 'next/image'
import MobileNav from './MobileNav'
import Hamburger from './Hamburger'
import ThemeToggle from './ThemeToggle'
import LinkNavbar from './LinkNavbar'
import ClientUserButton from './ClientUserButton'
import Loader from '@/components/ui/Loader'
import { Suspense } from 'react'

const Navbar = () => {

   return (
      <header className="w-full flex justify-center fixed top-0 bg-[var(--color-background)]/80 z-50 backdrop-brightness-80 backdrop-blur-md  border-b-1 border-[var(--color-tertiary)]">
         <MobileNav />

         <nav className="w-full max-w-[1536px] h-18 flex justify-between items-center px-5 lg:px-10 py-3">
            <div className="h-12 flex items-center gap-2 cursor-pointer">
               <Image src="/images/logo.webp" alt="logo" className="text-white" width={50} height={50}/>
               <h1 className='text-xl text-[var(--color-foreground)] font-bold tracking-tighter'>Healthy Tails</h1>
            </div>

            <div className="flex items-center gap-5">
               <LinkNavbar />
               <ThemeToggle />
               <Suspense fallback={<Loader/>}>
                  <ClientUserButton />
               </Suspense>
               <Hamburger />
            </div>
         </nav>

      </header>
   )
}

export default Navbar