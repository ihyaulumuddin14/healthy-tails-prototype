'use client'

import Main from "@/components/ui/Main";
import Navbar from "@/components/ui/Navbar";
import appStore from "@/stores/appStore";
import { useEffect } from "react";
import LinkSidebar from "@/components/ui/LinkSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import loading from "../LoadingScreen";
import AuthGuard from "../AuthGuard";
import ForbiddenPage from "../forbidden";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const isSidebarOpen = appStore(state => state.isSidebarOpen)
   const setIsSidebarOpen = appStore(state => state.setIsSidebarOpen)

   useEffect(() => {
      return () => {
         setIsSidebarOpen(false)
      }
   }, [])

   return (
      <AuthGuard
         skeleton={loading()}
         fallback={<ForbiddenPage />}
         role="ADMIN"
      >
         <Navbar />
         <Main>
            <Breadcrumbs />
            <section className={`w-full h-[calc(100vh-128px)] grid ${isSidebarOpen ? "grid-cols-[300px_1fr]" : "grid-cols-[55px_1fr]"} transisiton-all duration-400 ease-in-out relative top-32 overflow-hidden gap-2`}>
               <aside className="w-full h-full bg-[var(--color-background)] flex flex-col items-end sticky top-0 rounded-r-4xl overflow-hidden">
                  <header className="w-full max-w-[250px] h-fit relative flex justify-end px-4 py-5 border-b-1 border-[var(--color-foreground)]/20">
                     <h1 className={`${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-400 ease-in-out absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none`}>John Doe</h1>
                     <svg className='w-6 h-6 cursor-pointer' aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'var(--color-foreground)' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h6v12H4zm8 0V7h8V5l.002 14H12z"></path>
                        <path d="M6 10h2v2H6zm0 4h2v2H6z"></path>
                     </svg>
                  </header>
                  <nav className="w-full max-w-[250px] h-full mt-5">
                     <LinkSidebar type="admin" />
                  </nav>
               </aside>

               <div className={`w-full h-full ${isSidebarOpen ? "blur-3xl md:blur-none" : ""} transition-all duration-400 ease-in-out rounded-l-4xl bg-[var(--color-background)] overflow-y-auto`}>
                  {children}
               </div>
            </section>
         </Main>
      </AuthGuard>
   )
}
