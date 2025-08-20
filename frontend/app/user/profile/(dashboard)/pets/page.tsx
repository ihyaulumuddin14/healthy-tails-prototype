'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Pets from "./components/Pets";
import PetDialog from "./components/PetDialog";
import AddButton from "../../../../../components/ui/AddButton";
import DashboardContent from "@/components/ui/DashboardContent";

export default function PetsPage() {
   const [selectedFilter, setSelectedFilter] = useState('All');

   return (
      <DashboardContent type="user" subtitle="Manage and update information about your beloved pets.">
         <div className="w-full flex items-center gap-5 self-start justify-between mb-10">
            <div className="w-full max-w-[300px] flex items-center gap-5">
               {/* search input */}
               <div className="relative w-full">
                  <label htmlFor="search" className="text-[var(--color-muted-foreground)] absolute top-1/2 -translate-y-1/2 left-4">
                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                     </svg>
                  </label>
                  <input id="search" type="text" className="w-full px-3 py-2 pl-13 outline-0 bg-[var(--color-foreground)]/10 rounded-4xl focus:rounded-none transition-all duration-400 ease-in-out peer" />
                  <div className="peer-focus:w-full w-0 h-0 border-t-2 border-[var(--color-accent)] absolute bottom-0 origin-center transition-all duration-400 ease-in-out"></div>
               </div>

               {/* filter */}
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <svg className="w-6 h-6 text-[var(--color-muted-foreground)] cursor-pointer hover:text-[var(--color-foreground)] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" />
                     </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20 border-[var(--color-muted)]">
                     <DropdownMenuLabel>Type</DropdownMenuLabel>
                     <DropdownMenuRadioGroup value={selectedFilter} onValueChange={setSelectedFilter}>
                        <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Cat">Cat</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Dog">Dog</DropdownMenuRadioItem>
                     </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <AddButton type="petAdd">
               <svg className="relative z-1 w-6 h-6 group-hover:text-[var(--color-accent-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
               </svg>
               <span className="relative z-1 whitespace-nowrap hidden sm:block group-hover:text-[var(--color-accent-foreground)]">Add Pet</span>
            </AddButton>
         </div>

         <Pets selectedFilter={selectedFilter} />

         <PetDialog />
      </DashboardContent>
   )
}
