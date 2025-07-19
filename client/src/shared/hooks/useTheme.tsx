import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = {
   theme: string,
   setTheme: () => void
}

const useTheme = create<ThemeState>()(
   persist(
      (set) => ({
         theme: "dark",
         setTheme: () => {
            set((state) => {
               if (state.theme === "dark") {
                  return { theme: "light" }
               } else {
                  return { theme: "dark" }
               }
            })
         }
      }),
      {
         name: "theme"
      }
   )
)

export default useTheme;