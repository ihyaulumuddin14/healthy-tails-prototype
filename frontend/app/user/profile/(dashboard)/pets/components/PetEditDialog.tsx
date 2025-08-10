import Input from "@/app/(auth)/components/Input";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pet } from "@/type/type";
import { useEffect } from "react";
import SubmitButton from '@/components/ui/BasicButton';
import { useForm } from "react-hook-form";
import { PetCredentials, PetSchema } from "@/schema/PetSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import DropdownInput from "@/components/ui/DropdownInput";
import { CalendarInput } from "@/components/ui/CalendarInput";
import { useDialogStore } from "@/stores/useDialogStore";


export default function PetEditDialog() {
   const pet = useDialogStore((state) => state.pet)
   const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors, isSubmitting },
   } = useForm<PetCredentials>({
      resolver: zodResolver(PetSchema)
   })

   // const pet: Pet = await fetchPetData(_id)
   const pet1: Pet = {
      _id: '1',
      name: "Mocky",
      type: "Cat",
      race: "Persia",
      color: "Brown",
      birthDate: new Date(),
      age: 1,
      gender: "Male",
      owner: "John Doe"
   }

   useEffect(() => {
      if (pet) {
         setValue('name', pet.name)
         setValue('type', pet.type as 'Cat' | 'Dog')
         setValue('race', pet.race)
         setValue('color', pet.color)
         setValue('birthDate', pet.birthDate)
         setValue('age', pet.age)
         setValue('gender', pet.gender as 'Male' | 'Female')
         setValue('owner', pet.owner)
      }
   }, [])

   return (
      <DialogContent>
         <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
            <DialogHeader>
               <DialogTitle>Edit Pet Data</DialogTitle>
            </DialogHeader>

            {pet === null && <div>Loading...</div>}
            {pet && (
               <div className="w-full max-w-[1400px] h-[400px] overflow-y-auto [scrollbar-width:thin] bg-[var(--color-muted)] p-1 sm:p-4 rounded-2xl my-4">
                  <Input label="Name" type="text" id="name" placeholder="Enter your pet name" {...register('name')} error={errors.name?.message} />
                  <div className="w-full grid grid-cols-2 gap-4">
                     <DropdownInput name="type" control={control} label="Type" error={errors.type?.message}
                        options={[
                           { value: 'Cat', label: 'Cat' },
                           { value: 'Dog', label: 'Dog' },
                        ]}/>
                     <DropdownInput name="gender" control={control} label="Gender" error={errors.gender?.message}
                        options={[
                           { value: 'Male', label: 'Male' },
                           { value: 'Female', label: 'Female' }
                        ]}/>
                     <Input label="Race" type="text" id="race" placeholder="Enter your pet race" {...register('race')} error={errors.race?.message} />
                     <Input label="Color" type="text" id="color" placeholder="Enter your pet color" {...register('color')} error={errors.color?.message} />
                     <CalendarInput label="Birth Date" name="birthDate" control={control} error={errors.birthDate?.message}/>
                     <Input label="Age" type="number" id="age" placeholder="Enter your pet age" {...register('age', { valueAsNumber: true })} error={errors.age?.message} />
                  </div>
                  <Input label="Owner" type="text" id="owner" placeholder="Enter your pet owner" {...register('owner')} error={errors.owner?.message} />
               </div>
            )}
            <DialogFooter>
               <SubmitButton type="submit" model="fill" width='auto'>Change</SubmitButton>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}
