import { create } from 'zustand'

type StoreState = {
   isLoading: boolean,
   setIsLoading: (arg: boolean) => void,
   error: string | null,
   isMobile: undefined | boolean,
   setIsMobile: (arg: boolean) => void,
   isMobileNavOpen: undefined | boolean,
   setIsMobileNavOpen: (arg: boolean) => void
}

const useStore = create<StoreState>((set) => ({
   isLoading: false,
   setIsLoading: (arg: boolean) => set({ isLoading: arg }),
   error: null,
   isMobile: false,
   setIsMobile: (arg: boolean) => set({ isMobile: arg }),
   isMobileNavOpen: false,
   setIsMobileNavOpen: (arg: boolean) => set({ isMobileNavOpen: arg })
}))

export default useStore;