import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from "sonner"

type VerifyStoreType = {
   email: string,
   setEmail: (arg: {  email: string, updatedAt: number }) => void,
   clearEmail: () => void,
   updatedAt: number
}

const useVerifyStore = create<VerifyStoreType>()(
   persist(
      (set) => ({
         email: '',
         setEmail: (arg: { email: string, updatedAt: number }) => {
            set({
               email: arg.email,
               updatedAt: arg.updatedAt
            })
         },
         clearEmail: () => {
            set({ email: '', updatedAt: 0 })
         },
         updatedAt: 0
      }),
      {
         name: 'email',
         storage: {
            getItem: (name: string) => {
               const itemStr = sessionStorage.getItem(name)
               if (!itemStr) return null

               try {
                  const item = JSON.parse(itemStr)
                  const now = Date.now()
                  if (item.expireAt && now > item.expireAt) {
                     throw new Error();
                  }
                  return item.value
               } catch {
                  sessionStorage.removeItem(name)
                  toast.error("Verify session expired");
                  return null
               }
            },
            setItem: (name, value) => {
               const now = Date.now();
               const maxAgeInMs = 5 * 60 * 1000;
               const expireAt = now + maxAgeInMs;
               const item = {
                  value: JSON.stringify(value),
                  expireAt,
                  email: value.state.email
               }
               sessionStorage.setItem(name, JSON.stringify(item))
            },
            removeItem: (name) => sessionStorage.removeItem(name),
         }
      }
   )
)


export default useVerifyStore;