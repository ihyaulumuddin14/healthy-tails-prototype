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
            <button className="text-[var(--color-tertiary-foreground)] bg-[var(--color-tertiary)] px-3 py-1 rounded-sm text-[clamp(0.7rem,1.8vw,1.3rem)] hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out flex items-center">Change Photo</button>
         </div>
      </div>
   )
}
