import { sidebarAdminLink, sidebarUserLink } from '@/app/constant';
import { Dialog } from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import React from 'react'


type Props = {
   children: React.ReactNode
   type: 'user' | 'admin'
   subtitle: string
}

export default function DashboardContent({ children, type, subtitle }: Props) {
   const pathName = usePathname();
   const links: {
      name: string;
      path: string;
      icons: React.JSX.Element;
   }[] = type === 'user' ? sidebarUserLink : sidebarAdminLink

   return (
      <Dialog>
         <section className="w-full h-fit p-[min(6vw,100px)] flex flex-col justify-center items-center gap-2">
            <h1 className="w-full self-start text-2xl sm:text-3xl lg:text-4xl font-bold ml-2">
               {links.filter(link => link.path === pathName)[0].name}
            </h1>
            <p className='w-full self-start text-md sm:text-lg lg:text-xl font-extralight ml-2 mb-7 sm:mb-10 pb-5 border-b-2 border-border'>{subtitle}</p>

            { children }
         </section>
      </Dialog>
   )
}
