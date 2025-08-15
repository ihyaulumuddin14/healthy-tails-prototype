import { Booking, Service } from '@/type/type'
import { create } from 'zustand'
import { bookings } from '@/app/constant'

type UserStoreType = {
   bookings: Booking[] | null
   setBookings: (arg: Booking[] | null) => void
   services: Service[] | null,
   setServices: (arg: Service[] | null) => void,
}

export const userStore = create<UserStoreType>((set) => ({
   bookings: bookings as Booking[],
   setBookings: (arg: Booking[] | null) => set({ bookings: arg }),
   services: null,
   setServices: (arg: Service[] | null) => set({ services: arg }),
}))