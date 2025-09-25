import { create } from 'zustand'

type AdminDialogStore = {
   dialogAdminMode: "adminPhoto" | "adminPassword" | null
   setDialogAdminMode: (arg: "adminPhoto" | "adminPassword" | null) => void
}

export const adminDialogStore = create<AdminDialogStore>((set) => ({
   dialogAdminMode: null,
   setDialogAdminMode: (arg: "adminPhoto" | "adminPassword" | null) => set({ dialogAdminMode: arg })
}))