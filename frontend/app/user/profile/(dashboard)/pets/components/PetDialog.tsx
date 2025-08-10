import { Dialog } from "@radix-ui/react-dialog";
import PetEditDialog from "./PetEditDialog";
import ProfilePhotoDialog from "@/components/ui/ProfilePhotoDialog";
import { useDialogStore } from "@/stores/useDialogStore";
import PetAddDialog from "./PetAddDialog";

export default function PetDialog() {
   const dialogPetMode = useDialogStore((state) => state.dialogPetMode)
   const setDialogPetMode = useDialogStore((state) => state.setDialogPetMode)
   const setPet = useDialogStore((state) => state.setPet)

   return (
      <Dialog open={dialogPetMode !== null} onOpenChange={(open) => {
         if (!open) {
            setDialogPetMode(null)
            setPet(null)
         }
      }}>
         {/* <Sheet open={dialogPetMode === 'book'} onOpenChange={(open) => {
            if (!open) {
               setDialogPetMode(null)
            }
         }}>
            {dialogPetMode === 'book' && <AppointmentSheet/>} */}
            {dialogPetMode === 'data' && <PetEditDialog/>}
            {dialogPetMode === 'photo' && <ProfilePhotoDialog/>}
            {dialogPetMode === 'add' && <PetAddDialog/>}
         {/* </Sheet> */}
      </Dialog>
   )
}
