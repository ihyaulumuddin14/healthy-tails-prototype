'use client'

import { dialogStore } from "@/stores/dialogStore";

type Props = {
   type: 'petAdd' | 'book'
   children?: React.ReactNode
}

export default function AddButton({ type, children }: Props) {
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode);

   return (
      <button className="shrink-0 relative flex items-center gap-2 text-[var(--color-background)] bg-[var(--color-foreground)] hover:text-[var(--color-foreground)] p-2 sm:px-4 rounded-4xl hover:rounded-sm transition-all duration-400 ease-in-out cursor-pointer group overflow-hidden"
         onClick={() => setDialogPetMode(type)}>
         <div className="absolute z-0 top-0 left-0 w-0 group-hover:w-full h-full bg-[var(--color-accent)] transition-all duration-400 ease-in-out"></div>
         {children}
      </button>
   )
}
