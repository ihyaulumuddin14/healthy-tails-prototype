'use client'

import Image from "next/image"
import { useState } from "react"
import { Pet } from "@/type/type"
import { useDialogStore } from "@/stores/useDialogStore"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type PetCardProps = {
   pet?: Pet
}

export default function PetCard({ pet }: PetCardProps) {
   const [detailsOpen, setDetailsOpen] = useState(false)
   const setDialogPetMode = useDialogStore((state) => state.setDialogPetMode)
   const setPet = useDialogStore((state) => state.setPet)

   return (
      <div className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden relative border-2 border-border flex flex-col justify-end">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className="absolute top-3 right-3 z-1 p-2 bg-transparent backdrop-blur-xs rounded-2xl cursor-pointer border border-border/30">
                  <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                  </svg>
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-35">
               <DropdownMenuItem onClick={() => {
                  setPet(pet as Pet)
                  setDialogPetMode('data')}}
               >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                  Edit Data
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => {
                  setPet(pet as Pet)
                  setDialogPetMode('photo')}}
               >
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                     <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
                  </svg>
                  Change Image
               </DropdownMenuItem>
               <DropdownMenuItem variant="destructive" onClick={() => {}}>
                  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                  </svg>
                  Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>

         <Image src="/images/bg-hero.webp" loading="eager" alt="Hero" width={300} height={300} className="w-full h-full object-cover absolute top-0 left-0 mask-b-from-80% brightness-50 hover:scale-110 hover:brightness-100 ease-in-out duration-300 cursor-pointer sm:cursor-default" />
         
         <h1 className="relative z-1 flex-text-1 font-bold text-white text-center mb-5">Mocky</h1>
         <div className={`details relative z-1 w-full h-fit grid ${detailsOpen ? "grid-rows-[50px_1fr]" : "grid-rows-[50px_0fr]"} bg-[var(--color-muted)] gap-5 rounded-3xl transition-all duration-400 ease-in-out`}>
            <div className="h-full w-full flex items-center justify-between py-2 px-10 hover:text-[var(--color-muted-foreground)] transition-all duration-200 ease-in-out border-b-1 border-[var(--color-border)] cursor-pointer font-semibold" onClick={() => setDetailsOpen(!detailsOpen)}>
               Details
               <svg className={`${detailsOpen ? "rotate-180" : ""} transition-all duration-400 ease-in-out`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: 'var(--color-muted-foreground)'}}><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>
            </div>
            <div className="h-full w-full overflow-hidden">
               <div className="w-full h-full p-5 grid grid-cols-2">
                  {/* left */}
                  <div className="w-full overflow-hidden">
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Name</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.name}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Type</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.type}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Race</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.race}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Color</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.color}</h3>
                     </div>
                  </div>

                  {/* right */}
                  <div className="w-full overflow-hidden">
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Birthdate</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Age</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.age}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Gender</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.gender}</h3>
                     </div>
                     <div className="mb-1">
                        <h2 className="text-gray-400 text-xs font-semibold">Owner</h2>
                        <h3 className="text-[var(--color-foreground)] text-sm font-semibold">{pet?.owner}</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
