import { Pet, Booking } from '@/type/type'
import { create } from 'zustand'
import { bookings } from '@/app/constant'

type DialogStore = {
   dialogPetMode: 'userPhoto' | 'petData' | 'petPhoto' | 'petAdd' | 'book' | 'booked' | null
   setDialogPetMode: (arg: 'userPhoto' | 'petData' | 'petPhoto' | 'petAdd' | 'book' | 'booked' | null) => void
   pet: Pet | null
   setPet: (arg: Pet | null) => void
   booking: Booking | null
   setBooking: (arg: Booking | null) => void
}

export const dialogStore = create<DialogStore>((set) => ({
   dialogPetMode: null,
   setDialogPetMode: (arg: 'userPhoto' | 'petData' | 'petPhoto' | 'petAdd' | 'book' | 'booked' | null) => set({ dialogPetMode: arg }),
   pet: null,
   setPet: (arg: Pet | null) => set({ pet: arg }),
   booking: null,
   setBooking: (arg: Booking | null) => set({ booking: arg }),
}))