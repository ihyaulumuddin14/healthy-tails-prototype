import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-hot-toast'

type ResetStoreType = {
   emailRecovery: string | null,
   setEmailRecovery: (arg: string) => void,
   clearEmailRecovery: () => void
}

const useResetStore = create<ResetStoreType>()(
   persist(
      (set) => ({
         emailRecovery: "",
         setEmailRecovery: (arg: string) => {
            set({ emailRecovery: arg })
         },
         clearEmailRecovery: () => {
            set({ emailRecovery: null })
         }
      }),
      {
         name: 'emailRecovery',
         storage: {
            getItem: (name: string) => {
               const itemStr = sessionStorage.getItem(name)
               if (!itemStr) return null

               try {
                  const item = JSON.parse(itemStr)
                  const now = Date.now()
                  if (item.expireAt && now > item.expireAt) {
                     sessionStorage.removeItem(name)
                     return null
                  }
                  return item.value
                  
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               } catch (e) {
                  sessionStorage.removeItem(name)
                  toast.error("Reset session expired");
                  return null
               }
            },
            setItem: (name, value) => {
               const now = Date.now();
               const maxAgeInMs = 20 * 60 * 1000;
               const expireAt = now + maxAgeInMs;
               const item = {
                  value: JSON.stringify(value),
                  expireAt,
               }
               sessionStorage.setItem(name, JSON.stringify(item))
            },
            removeItem: (name) => sessionStorage.removeItem(name),
         }
      }
   )
)


export default useResetStore;