import { sidebarAdminLink, sidebarUserLink } from '@/app/constant';
import { Dialog } from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import React from 'react'


type Props = {
   children: React.ReactNode
   type: 'user' | 'admin'
}

export default function DashboardContent({ children, type }: Props) {
   const pathName = usePathname();
   const links: {
      name: string;
      path: string;
      icons: React.JSX.Element;
   }[] = type === 'user' ? sidebarUserLink : sidebarAdminLink

   return (
      <Dialog>
         <section className="w-full h-fit p-[min(6vw,100px)] flex flex-col justify-center items-center gap-5">
            <h1 className="self-start text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-5 ml-2">
               {links.filter(link => link.path === pathName)[0].name}
            </h1>

            { children }
         </section>
      </Dialog>
   )
}
