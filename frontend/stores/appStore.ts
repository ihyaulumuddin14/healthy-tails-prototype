import { News } from '@/type/type'
import { create } from 'zustand'

type AppStoreType = {
   news: News[] | null,
   setNews: (arg: News[] | null) => void,
   isMobile: undefined | boolean,
   setIsMobile: (arg: boolean) => void,
   isMobileNavOpen: undefined | boolean,
   setIsMobileNavOpen: (arg: boolean) => void,
   isSidebarOpen: undefined | boolean,
   setIsSidebarOpen: (arg: boolean) => void,
}

const appStore = create<AppStoreType>((set) => ({
   news: null,
   setNews: (arg: News[] | null) => set({ news: arg }),
   isMobile: false,
   setIsMobile: (arg: boolean) => set({ isMobile: arg }),
   isMobileNavOpen: false,
   setIsMobileNavOpen: (arg: boolean) => set({ isMobileNavOpen: arg }),
   isSidebarOpen: false,
   setIsSidebarOpen: (arg: boolean) => set({ isSidebarOpen: arg }),
}))

export default appStore;