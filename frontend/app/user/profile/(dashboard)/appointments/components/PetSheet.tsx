

import { Sheet } from "@/components/ui/sheet";
import { useDialogStore } from "@/stores/useDialogStore";
import { AppointmentSheet } from "./AppointmentSheet";

export default function PetDialog() {
   const dialogPetMode = useDialogStore((state) => state.dialogPetMode)
   const setDialogPetMode = useDialogStore((state) => state.setDialogPetMode)

   return (
      <Sheet open={dialogPetMode === 'book'} onOpenChange={(open) => {
         if (!open) {
            setDialogPetMode(null)
         }
      }}>
         {dialogPetMode === 'book' && <AppointmentSheet/>}
      </Sheet>
   )
}
