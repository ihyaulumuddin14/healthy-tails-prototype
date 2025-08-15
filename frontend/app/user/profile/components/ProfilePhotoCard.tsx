import { DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import ImageDefault from "@/public/images/default_avatar.png"
import { useState } from "react"

type Props = {
   imageUrl?: string
}

export default function ProfilePhotoCard({ imageUrl }: Props) {
   const [src, setSrc] = useState(imageUrl || ImageDefault);


   return (
      <div className="w-full h-fit relative flex flex-col justify-center items-center">
         <div className="w-[90%] lg:w-1/2 max-w-[250px] lg:self-start aspect-square rounded-full overflow-hidden bg-[var(--color-chart-1)] flex justify-center items-center relative z-1">
            <Image
               src={src}
               alt="profile photo"
               width={250} height={250}
               className="w-[80%] aspect-square rounded-full object-cover"
               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII"
               placeholder="blur"
               unoptimized
               onError={() => setSrc(ImageDefault)}
               />
               <DialogTrigger asChild>
                  <div className="flex lg:hidden absolute bottom-[15%] right-[15%] z-1 bg-foreground rounded-full p-2 border-3 border-chart-1 active:scale-90 cursor-pointer duration-150 ease-in-out transition-all">
                     <svg className="w-5 h-5 text-background" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                     </svg>
                  </div>
               </DialogTrigger>
         </div>
         <div className="hidden lg:flex w-2/3 h-fit p-4 bg-[var(--color-chart-1)] absolute top-1/2 -translate-y-1/2 right-0 justify-end rounded-2xl">
            <DialogTrigger asChild>
               <button className="bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] py-2 px-3 rounded-xl text-[clamp(0.8rem,1.8vw,1.1rem)] hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out flex items-center font-semibold">Change Photo</button>
            </DialogTrigger>
         </div>
      </div>
   )
}
