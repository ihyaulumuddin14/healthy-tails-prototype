'use client'

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Link } from "@/providers/nprogress/Link";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function Breadcrumbs() {
   const pathName = usePathname();
   const breadcrumbList = pathName.split('/').filter(Boolean);
   
   return (
      <div className="breadcrumb w-full h-fit flex justify-center bg-[var(--color-background)]/90 text-md fixed z-49 top-20">
         <div className="content-wrapper py-2 px-[min(6vw,100px)]">
            <Breadcrumb>
               <BreadcrumbList>
                  {breadcrumbList.map((breadcrumb, index) => {
                     if (index === 0 || /\d/.test(breadcrumb)) return null
                     if (index === breadcrumbList.length - 1) {
                        return (
                           <Fragment key={index}>
                              <BreadcrumbLink>
                                 <Link href={`/${breadcrumbList.slice(0, index + 1).join('/')}`}>
                                    {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
                                 </Link>
                              </BreadcrumbLink>
                           </Fragment>
                        )
                     } else if (breadcrumb === 'booking' || breadcrumb === 'history' || breadcrumb === "report") {
                        return (
                           <Fragment key={index}>
                              <BreadcrumbLink>
                                 <Link href={`/${breadcrumbList.join('/')}`}>
                                    {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
                                 </Link>
                              </BreadcrumbLink>
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
                              <BreadcrumbSeparator />
                           </Fragment>
                        )
                     }
                  })}
               </BreadcrumbList>
            </Breadcrumb>
         </div>
      </div>
   )
}
