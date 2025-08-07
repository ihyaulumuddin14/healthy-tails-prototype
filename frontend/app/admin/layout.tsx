'use client'

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Main from "@/components/ui/Main";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import AuthGuard from "../AuthGuard";
import { usePathname } from "next/navigation";
import { Fragment, useEffect } from "react";
import useStore from "@/stores/useStore";
import LinkSidebar from "@/components/ui/LinkSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const pathName = usePathname();
   const breadcrumbList = pathName.split('/').filter(Boolean);
   const isSidebarOpen = useStore(state => state.isSidebarOpen)
   const setIsSidebarOpen = useStore(state => state.setIsSidebarOpen)

   useEffect(() => {
      return () => {
         setIsSidebarOpen(false)
      }
   }, [])

   return (
      <AuthGuard
         skeleton={<Skeleton className="w-10 h-10" />}
         fallback={<div className="w-full h-screen flex items-center justify-center">Sorry you are not logged in</div>}
         >
         <Navbar />
         <Main>
            <div className="breadcrumb w-full h-fit flex justify-center bg-[var(--color-background)]/90 text-md fixed z-49 top-20">
               <div className="content-wrapper py-2 px-[min(6vw,100px)]">
                  <Breadcrumb>
                     <BreadcrumbList>
                        {breadcrumbList.map((breadcrumb, index) => {
                           if (index === 0) return null
                           if (index !== breadcrumbList.length - 1) {
                              return (
                                 <Fragment key={index}>
                                    <BreadcrumbLink>
                                       <Link href={`/${breadcrumbList.slice(0, index + 1).join('/')}`}>
                                             {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
                                       </Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                 </Fragment>
                              )
                           } else {
                              return (
                                 <Fragment key={index}>
                                    <BreadcrumbLink key={index}>
                                       <Link href={`/${breadcrumbList.slice(0, index + 1).join('/')}`}>
                                          {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
                                       </Link>
                                    </BreadcrumbLink>
                                 </Fragment>
                              )
                           }
                        })}
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
            </div>

            <section className={`w-full h-[calc(100vh-120px)] grid ${isSidebarOpen ? "grid-cols-[300px_1fr]" : "grid-cols-[55px_1fr]"} transisiton-all duration-400 ease-in-out relative top-30 overflow-y-scroll`}>
               <aside className="w-full h-[calc(100vh-120px)] border-r-1 border-[var(--color-foreground)]/20 bg-[var(--color-background)] flex flex-col items-end sticky top-0">
                  <header className="w-full max-w-[250px] h-fit relative flex justify-end px-4 py-5 border-y-1 border-[var(--color-foreground)]/20">
                     <h1 className={`${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-all duration-400 ease-in-out absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none`}>Mimin</h1>
                     <svg className='w-6 h-6 cursor-pointer' aria-hidden='true' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-foreground)'}} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h6v12H4zm8 0V7h8V5l.002 14H12z"></path>
                        <path d="M6 10h2v2H6zm0 4h2v2H6z"></path>
                     </svg>
                  </header>
                  <nav className="w-full max-w-[250px] h-full mt-5">
                     <LinkSidebar type="admin" />
                  </nav>
               </aside>
               <div className={`w-full h-[300vh] ${isSidebarOpen ? "blur-3xl md:blur-none" : ""} transition-all duration-400 ease-in-out`}>
                  {children}
               </div>
            </section>
         </Main>
      </AuthGuard>
   )
}
