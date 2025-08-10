import { DialogTrigger } from "@/components/ui/dialog"

type Props = {
   imageUrl?: string
}

export default function ProfilePhotoCard({ imageUrl }: Props) {
   return (
      <div className="w-full h-fit relative">
         <div className="w-1/2 max-w-[250px] aspect-square rounded-full overflow-hidden bg-[var(--color-chart-1)] flex justify-center items-center relative z-1">
            <div className="w-[80%] aspect-square rounded-full bg-white"></div>
         </div>
         <div className="w-2/3 h-fit p-4 bg-[var(--color-chart-1)] absolute top-1/2 -translate-y-1/2 right-0 flex justify-end rounded-2xl">
            <DialogTrigger asChild>
               <button className="bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] py-2 px-5 rounded-xl text-[clamp(0.8rem,1.8vw,1.1rem)] hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out flex items-center gap-2] font-semibold">Change Photo</button>
            </DialogTrigger>
         </div>
      </div>
   )
}
