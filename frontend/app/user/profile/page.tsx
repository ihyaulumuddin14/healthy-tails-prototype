'use client'

import { ThreeDCardDemo } from "./components/3DCard"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import ProfilePhotoCard from "./components/ProfilePhotoCard"
// import { useAuthStore } from '@/hooks/useAuthStore'


const quickAccessList = [
   {
      name: 'Edit Profile',
      link: '/user/profile/info',
      color: 'bg-[var(--color-chart-2)]'
   },
   {
      name: 'Live Queue',
      link: '/user/profile/queue',
      color: 'bg-[var(--color-chart-1)]'
   },
   {
      name: 'Add Pet',
      link: '/user/profile/pets',
      color: 'bg-[var(--color-chart-3)]'
   },
   {
      name: 'Book New Visit',
      link: '/user/profile/appointments',
      color: 'bg-[var(--color-chart-4)]'
   }
]


export default function Profile() {
   // const user = useAuthStore((state) => state.user);
   const user = {
      name: 'John Doe',
      email: '7oHd5@example.com',
      role: 'admin',
      verified: true
   }

   const greetings = [
      {
         text: 'Hello, ',
         className: 'text-[var(--color-foreground)] text-4xl'
      },
      {
         text: user.name.split(' ')[0],
         className: 'text-[var(--color-foreground)] text-4xl'
      }
   ]

   return (
      <section className="section-wrapper relative top-30">
         <div className="content-wrapper h-fit p-[min(6vw,70px)] flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1200px]">
               <div className="profile-photo w-full h-fit md:aspect-square flex flex-col justify-start md:justify-center items-center p-10 gap-10 md:mb-0 mb-10">
                  <ProfilePhotoCard />
                  <TypewriterEffect words={greetings}/>
               </div>

               <div className="quick-access w-full h-fit grid grid-cols-2 gap-4">
                  {quickAccessList.map((item, index) => (
                     <ThreeDCardDemo key={index} name={item.name} link={item.link} color={item.color} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}
