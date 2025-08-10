import { Pet } from '@/type/type'
import { create } from 'zustand'


type DialogStore = {
   dialogPetMode: 'data' | 'photo' | 'add' | 'book' | null
   setDialogPetMode: (arg: 'data' | 'photo' | 'add' | 'book' | null) => void
   pet: Pet | null
   setPet: (arg: Pet | null) => void
}

export const useDialogStore = create<DialogStore>((set) => ({
   dialogPetMode: null,
   setDialogPetMode: (arg: 'data' | 'photo' | 'add' | 'book' | null) => set({ dialogPetMode: arg }),
   pet: null,
   setPet: (arg: Pet | null) => set({ pet: arg })
}))