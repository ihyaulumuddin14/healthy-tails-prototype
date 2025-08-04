import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
   return (
      <div className='news-card w-full h-full p-5 flex flex-col border-2 border-[var(--color-tertiary)]/20 rounded-2xl text-inter bg-[var(--foreground)]/10 backdrop-blur-3xl group'>
         <header className="w-full h-fit flex flex-col gap-2 mb-5 cursor-pointer group/header">
            <Skeleton className="w-24 h-6 mb-2"/>
            <Skeleton className="w-full h-8"/>
            <Skeleton className="w-1/2 h-8"/>
         </header>
         
         <main className="w-full h-fit overflow-hidden rounded-lg flex justify-center">
            <Skeleton className="h-[180px] w-full"/>
         </main>

         <footer className="w-full mt-3 flex justify-end">
            <Skeleton className="w-8 h-5"/>
         </footer>
      </div>
   )
}
