import { create } from 'zustand'
import { type User } from '../../features/auth/models/types'


type AuthState = {
   user: User | null,
   isLoading: boolean,
   error: string | null,
   setIsLoading: (arg: boolean) => void,
   setUser: (arg: User | null) => void,
}

const useStore = create<AuthState>((set) => ({
   user: null,
   isLoading: false,
   error: null,
   setIsLoading: (arg: boolean) => set({ isLoading: arg }),
   setUser: (arg: User | null) => set({ user: arg })
}))

export default useStore;