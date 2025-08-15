import { Dialog } from "@radix-ui/react-dialog";
import PetEditDialog from "./PetEditDialog";
import { dialogStore } from "@/stores/dialogStore";
import PetAddDialog from "./PetAddDialog";

export default function PetDialog() {
   const dialogPetMode = dialogStore((state) => state.dialogPetMode)
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode)
   const setPet = dialogStore((state) => state.setPet)

   return (
      <Dialog open={dialogPetMode !== null} onOpenChange={(open) => {
         if (!open) {
            setDialogPetMode(null)
            setPet(null)
         }
      }}>
         {dialogPetMode === 'petData' && <PetEditDialog />}
         {dialogPetMode === 'petAdd' && <PetAddDialog />}
      </Dialog>
   )
}
