'use client'

import { ThreeDCard } from "./components/ThreeDCard"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import ProfilePhotoCard from "./components/ProfilePhotoCard"
import { quickAccessList } from "@/app/constant"
import { Dialog } from "@/components/ui/dialog"
import PhotoDialog from "@/app/user/profile/components/PhotoDialog"
import Footer from "@/components/ui/Footer"
import useUser from "@/hooks/useUser"

export default function Profile() {
   const { user } = useUser();

   const greetings = [
      {
         text: 'Hello, ',
         className: 'text-[var(--color-foreground)] text-4xl'
      },
      {
         text: user?.name.split(' ')[0] as string,
         className: 'text-[var(--color-foreground)] text-4xl'
      }
   ]

   return (
      <Dialog>
         <section className="section-wrapper flex-col relative top-20 mb-20">
            <div className="content-wrapper h-fit p-[min(6vw,70px)] flex justify-center mb-10">
               <div className="w-full h-fit max-w-[1200px] grid grid-cols-1 md:grid-cols-2 md:gap-5">
                  <div className="profile-photo w-full h-fit md:aspect-square flex flex-col justify-start md:justify-center items-center px-3 p-10 md:px-10 gap-5 sm:gap-10 md:mb-0 mb-5 bg-[var(--color-foreground)]/5 hover:bg-[var(--color-foreground)]/10 transition-all duration-200 ease-in-out rounded-4xl backdrop-blur-2xl">
                     <ProfilePhotoCard/>
                     <TypewriterEffect words={greetings} />
                  </div>

                  <div className="quick-access w-full h-full grid grid-cols-2 gap-2">
                     {quickAccessList.map((item, index) => (
                        <ThreeDCard key={index} name={item.name} link={item.link} color={item.color}>
                           {item.icons}
                        </ThreeDCard>
                     ))}
                  </div>
               </div>
            </div>
         </section>
         <PhotoDialog/>
         <Footer />
      </Dialog>
   )
}
