'use client'

import AddButton from '@/components/ui/AddButton';
import DashboardContent from '@/components/ui/DashboardContent'
import { Sheet} from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import PetSheet from './components/PetSheet';
import { AlertDialog } from '@/components/ui/alert-dialog';
import AppointmentAlert from './components/AppointmentAlert';
import AppointmentsList from './components/AppointmentsList';
import { useState } from 'react';

export default function AppointmentsPage() {
   const [selectedFilter, setSelectedFilter] = useState('ALL');
   const [searchTerm, setSearchTerm] = useState('');

   return (
      <DashboardContent type='user' subtitle='Book and manage your veterinary visits with ease.'>
               <div className="w-full flex items-start gap-5 self-start justify-between mb-3 md:mb-10">
                  {/* search input */}
                  <div className="relative w-full max-w-[300px]">
                     <label htmlFor="search" className="text-[var(--color-muted-foreground)] absolute top-1/2 -translate-y-1/2 left-4">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                     </label>
                     <input id="search" type="text" className="w-full px-3 py-2 pl-13 outline-0 bg-[var(--color-foreground)]/10 rounded-4xl focus:rounded-none transition-all duration-400 ease-in-out peer font-extralight" placeholder='Search pet`s name' onChange={(e) => setSearchTerm(e.target.value)}/>
                     <div className="peer-focus:w-full w-0 h-0 border-t-2 border-[var(--color-accent)] absolute bottom-0 origin-center transition-all duration-400 ease-in-out"></div>
                  </div>

                  {/* toggle filter */}
                  <ToggleGroup className='hidden md:flex' type="single" value={selectedFilter} onValueChange={setSelectedFilter}>
                     <ToggleGroupItem value="ALL" aria-label="Toggle all">
                        <p className='text-xs sm:text-sm'>All</p>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="UPCOMING" aria-label="Toggle upcoming">
                        <p className='text-xs sm:text-sm'>Upcoming</p>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="COMPLETED" aria-label="Toggle completed">
                        <p className='text-xs sm:text-sm'>Completed</p>
                     </ToggleGroupItem>
                  </ToggleGroup>

                  {/* add appointment button */}
                  <AddButton type='book'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="relative z-1 w-6 h-6 group-hover:fill-[var(--color-accent-foreground)] fill-[var(--color-background)]">
                        <path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"></path>
                        <path d="M7 9h10v2H7zm0 4h5v2H7z"></path>
                     </svg>
                     <span className="relative z-1 whitespace-nowrap hidden sm:block group-hover:text-[var(--color-accent-foreground)]">Create Appointment</span>
                  </AddButton>
               </div>

               {/* toggle filter */}
               <ToggleGroup className='flex md:hidden self-start mb-10' type="single" value={selectedFilter} onValueChange={setSelectedFilter}>
                  <ToggleGroupItem value="ALL" aria-label="Toggle all">
                     <p className='text-xs sm:text-sm'>All</p>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="UPCOMING" aria-label="Toggle upcoming">
                     <p className='text-xs sm:text-sm'>Upcoming</p>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="COMPLETED" aria-label="Toggle completed">
                     <p className='text-xs sm:text-sm'>Completed</p>
                  </ToggleGroupItem>
               </ToggleGroup>

               {/* list */}
               <AppointmentsList searchTerm={searchTerm} selectedFilter={selectedFilter}/>

               {/* Appointment Sheet */}
               <PetSheet />

            <AppointmentAlert />
      </DashboardContent>
   )
}
