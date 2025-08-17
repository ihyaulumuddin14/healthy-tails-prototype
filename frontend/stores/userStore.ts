import { Service, User } from '@/type/type'
import { create } from 'zustand'

type UserStoreType = {
   user: User | null,
   setUser: (arg: User | null) => void,
   services: Service[] | null,
   setServices: (arg: Service[] | null) => void,
}

export const userStore = create<UserStoreType>((set) => ({
   user: null,
   setUser: (arg: User | null) => set({ user: arg }),
   services: null,
   setServices: (arg: Service[] | null) => set({ services: arg }),
}))