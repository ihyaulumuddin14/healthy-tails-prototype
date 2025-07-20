import { create } from 'zustand'
import { type User } from '../../features/auth/models/types'


type AuthState = {
   user: User | null,
   isLoading: boolean,
   error: string | null,
   setIsLoading: (arg: boolean) => void,
   setUser: (arg: User | null) => void,
   isMobile: undefined | boolean,
   setIsMobile: (arg: boolean) => void,
   fixedHeight: undefined | number,
   setFixedHeight: (arg: number) => void
}

const useStore = create<AuthState>((set) => ({
   user: null,
   isLoading: false,
   error: null,
   setIsLoading: (arg: boolean) => set({ isLoading: arg }),
   setUser: (arg: User | null) => set({ user: arg }),
   isMobile: undefined,
   setIsMobile: (arg: boolean) => set({ isMobile: arg }),
   fixedHeight: window.innerHeight,
   setFixedHeight: (arg: number) => set({ fixedHeight: arg })
}))

export default useStore;