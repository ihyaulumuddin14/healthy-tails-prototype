import MobileNav from './MobileNav'
import Hamburger from './Hamburger'
import ThemeToggle from './ThemeToggle'
import LinkNavbar from './LinkNavbar'
import { LoginButton, ProfileDropdown } from './ClientUserButton'
import LinkHomeLogo from './LinkHomeLogo'
import AuthGuard from '@/app/AuthGuard'
import { Skeleton } from '@/components/ui/skeleton'

const Navbar = () => {

   return (
      <header className="w-full flex justify-center fixed top-0 bg-[var(--color-background)]/80 z-50 backdrop-brightness-80 backdrop-blur-md  border-b-1 border-[var(--color-tertiary)]">
         <MobileNav />

         <nav className="w-full max-w-[1536px] h-18 flex justify-between items-center px-5 lg:px-10 py-3">
            <LinkHomeLogo />

            <div className="flex items-center gap-5">
               <LinkNavbar />
               <ThemeToggle />
               <AuthGuard
                  skeleton={<Skeleton className="w-10 h-10 hidden lg:block" />}
                  fallback={<LoginButton />}>
                     <ProfileDropdown />
               </AuthGuard>
               <Hamburger />
            </div>
         </nav>

      </header>
   )
}

export default Navbar