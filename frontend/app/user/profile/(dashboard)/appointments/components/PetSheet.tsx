import { Sheet } from "@/components/ui/sheet";
import { dialogStore } from "@/stores/dialogStore";
import { AppointmentSheet } from "./AppointmentSheet";

export default function PetSheet() {
   const dialogPetMode = dialogStore((state) => state.dialogPetMode)
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode)

   return (
      <Sheet open={dialogPetMode === 'book'} onOpenChange={(open) => {
         if (!open) {
            setDialogPetMode(null)
         }
      }}>
         {dialogPetMode === 'book' && <AppointmentSheet />}
      </Sheet>
   )
}
