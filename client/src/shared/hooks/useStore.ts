import { create } from 'zustand'
import { type User } from '../../features/auth/models/types'


type StoreState = {
   user: User | null,
   setUser: (arg: User | null) => void,
   isLoading: boolean,
   setIsLoading: (arg: boolean) => void,
   error: string | null,
   isMobile: undefined | boolean,
   setIsMobile: (arg: boolean) => void,
   fixedHeight: undefined | number,
   setFixedHeight: (arg: number) => void
}

const useStore = create<StoreState>((set) => ({
   user: null,
   setUser: (arg: User | null) => set({ user: arg }),
   isLoading: false,
   setIsLoading: (arg: boolean) => set({ isLoading: arg }),
   error: null,
   isMobile: window.innerWidth <= 768,
   setIsMobile: (arg: boolean) => set({ isMobile: arg }),
   fixedHeight: window.innerHeight,
   setFixedHeight: (arg: number) => set({ fixedHeight: arg })
}))

export default useStore;