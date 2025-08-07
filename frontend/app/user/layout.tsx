'use client'

import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Main from "@/components/ui/Main";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import AuthGuard from "../AuthGuard";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
   const pathName = usePathname();
   const breadcrumbList = pathName.split('/').filter(Boolean);

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
            {children}
         </Main>
      </AuthGuard>
   )
}
