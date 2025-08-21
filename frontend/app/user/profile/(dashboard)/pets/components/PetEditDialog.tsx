import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { showSuccessToast, showErrorToast } from "@/helpers/toastHelper";
import { EditPetCredentials, EditPetSchema } from "@/schema/PetSchema";
import { Pet } from "@/type/type";
import { useEffect } from "react";
import { dialogStore } from "@/stores/dialogStore";
import { editPet } from "@/api/pet.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/app/(auth)/components/Input";
import DropdownInput from "@/components/ui/DropdownInput";
import CalendarInput from "@/components/ui/CalendarInput";
import usePets from "@/hooks/usePets";
import AnimateFillButton from "@/components/ui/AnimateFillButton";

export default function PetEditDialog() {
   const { mutatePets } = usePets();
   const pet = dialogStore((state) => state.pet)
   const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors, isSubmitting },
   } = useForm<Partial<EditPetCredentials>>({
      resolver: zodResolver(EditPetSchema)
   })

   const handleSubmitData = async (data: EditPetCredentials) => {
      if (!pet) return
      const response = await editPet((pet as Pet)._id as string, data);

      if (response.success) {
         showSuccessToast(response.message)
         mutatePets(
            (prev: { success: boolean, message: string, pets: Pet[] }) => ({
               ...prev,
               pets: prev.pets.map(p => (
                  p._id === response.pet._id ? response.pet : p
               ))
            }),
            false
         )
      } else {
         showErrorToast(response.error as string)
      }
   }

   useEffect(() => {
      if (pet) {
         setValue('name', pet.name)
         setValue('type', pet.type as 'Cat' | 'Dog')
         setValue('race', pet.race)
         setValue('color', pet.color)
         if (pet.birthDate) setValue('birthDate', new Date(pet.birthDate as string))
         setValue('age', pet.age)
         setValue('gender', pet.gender as 'Male' | 'Female')
      }
   }, [])

   return (
      <DialogContent>
         <form action="" onSubmit={handleSubmit(handleSubmitData)}>
            <DialogHeader>
               <DialogTitle>Edit Pet Data</DialogTitle>
            </DialogHeader>

            {pet && (
               <div className="w-full max-w-[1400px] h-[400px] overflow-y-auto [scrollbar-width:thin] bg-[var(--color-muted)] p-1 sm:p-4 rounded-2xl my-4">
                  <Input label="Name" type="text" id="name" placeholder="Enter your pet name" {...register('name')} error={errors.name?.message} />
                  <div className="w-full grid grid-cols-2 gap-4">
                     <DropdownInput name="type" control={control} label="Type" error={errors.type?.message}
                        options={[
                           { value: 'Cat', label: 'Cat' },
                           { value: 'Dog', label: 'Dog' },
                        ]} />
                     <DropdownInput name="gender" control={control} label="Gender" error={errors.gender?.message}
                        options={[
                           { value: 'Male', label: 'Male' },
                           { value: 'Female', label: 'Female' }
                        ]} />
                     <Input label="Race" type="text" id="race" placeholder="Enter your pet race" {...register('race')} error={errors.race?.message} />
                     <Input label="Color" type="text" id="color" placeholder="Enter your pet color" {...register('color')} error={errors.color?.message} />
                     <CalendarInput label="Birth Date" name="birthDate" control={control} error={errors.birthDate?.message} optional/>
                     <Input label="Age (years)" type="number" id="age" placeholder="Enter your pet age" {...register('age', { valueAsNumber: true })} error={errors.age?.message} />
                  </div>
               </div>
            )}
            <DialogFooter>
               <AnimateFillButton isLoading={isSubmitting} type="submit" model="fill" width='auto'>Change</AnimateFillButton>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}
