import { create } from 'zustand'
import { type User, type LoginCredentials, type RegisterData } from '../models/types'

type AuthState = {
   setUser: any
   user: User | null,
   isLoading: boolean,
   error: string | null,

   login: (credential: LoginCredentials) => Promise<void>,
   register: (data: RegisterData) => Promise<void>,
   loginWithGoogle: () => Promise<void>,
   logout: () => void
}

const useStoreAuth = create<AuthState>()((set) => ({
   user: null,
   isLoading: false,
   error: null,

   login: async (credential) => {
      // set({
      //    isLoading: true,
      //    error: null
      // })

      // try {
      //    const response = await fetch('/api/login', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({ credential })
      //    });

      //    if (!response.ok) throw new Error('Login failed')

      //    const user = await response.json();

      //    set({ user, isLoading: false, error: null })
      // } catch (error) {
      //    if (error instanceof Error) {
      //       set({ error: error.message, isLoading: false })
      //    }
      // }
   },

   register: async (data) => {
      set({
         isLoading: false,
         error: null
      })
   },

   loginWithGoogle: async () => {
      set({
         isLoading: false,
         error: null
      })
   },

   logout: () => {
      set({
         user: null,
         isLoading: false,
         error: null
      })
   }
}))

export default useStoreAuth;