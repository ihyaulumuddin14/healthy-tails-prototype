import Input from "@/app/(auth)/components/Input";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreatePetCredentials, CreatePetSchema } from "@/schema/PetSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import DropdownInput from "@/components/ui/DropdownInput";
import CalendarInput from "@/components/ui/CalendarInput";
import { createPet } from "@/api/pet.actions";
import { showErrorToast, showSuccessToast } from "@/helpers/toastHelper";
import usePets from "@/hooks/usePets";
import { Pet } from "@/type/type";
import AnimateFillButton from "@/components/ui/AnimateFillButton";


export default function PetAddDialog() {
   const { mutatePets } = usePets();
   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
   } = useForm<CreatePetCredentials>({
      resolver: zodResolver(CreatePetSchema)
   })

   const handleSubmitData = async (data: CreatePetCredentials) => {
      const response = await createPet(data as CreatePetCredentials);

      if (response.success) {
         showSuccessToast(response.message)
         mutatePets(
            (prev: { success: boolean, message: string, pets: Pet[] }) => ({
               ...prev,
               pets: [...prev.pets, response.pet]
            }),
            false
         );
      } else {
         showErrorToast(response.error as string)
      }
   }

   return (
      <DialogContent>
         <form action="" onSubmit={handleSubmit(handleSubmitData)}>
            <DialogHeader>
               <DialogTitle>Add New Pet</DialogTitle>
            </DialogHeader>

            <div className="w-full max-w-[1400px] h-[400px] overflow-y-auto [scrollbar-width:thin] bg-[var(--color-muted)] p-1 sm:p-4 rounded-2xl my-4">
               <Input label="Name" type="text" id="name" placeholder="Enter your pet name" {...register('name')} error={errors.name?.message} />
               <div className="w-full grid sm:grid-cols-2 gap-4">
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
                  <CalendarInput label="Birth Date" name="birthDate" control={control} error={errors.birthDate?.message} optional />
                  <Input label="Age (years)" type="number" id="age" placeholder="Enter your pet age" {...register('age', { valueAsNumber: true })} error={errors.age?.message} />
               </div>
            </div>

            <DialogFooter>
               <AnimateFillButton isLoading={isSubmitting} type="submit" model="fill" width='auto'>Add Pet</AnimateFillButton>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}
