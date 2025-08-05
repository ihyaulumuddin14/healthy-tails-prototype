import { create } from 'zustand'


type UserType = {
   name: string,
   email: string,
   role: "USER" | "ADMIN",
   verified: boolean
}

type AuthState = {
   user: UserType | null
   accessToken: string | null
   setAccessToken: (args: string) => void
   setUser: (args: UserType | null) => void
   logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
   user: null,
   accessToken: null,
   setAccessToken: (accessToken: string) => set({ accessToken }),
   setUser: (user: UserType | null) => set({ user }),
   logout: () => set({ user: null, accessToken: null })
}))