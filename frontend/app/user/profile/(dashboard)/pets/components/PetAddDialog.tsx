import Input from "@/app/(auth)/components/Input";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      formState: { errors, isSubmitting },
   } = useForm<PetCredentials>({
      resolver: zodResolver(PetSchema)
   })

   return (
      <DialogContent>
         <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
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

            <DialogFooter>
               <SubmitButton type="submit" model="fill" width='auto'>Add Pet</SubmitButton>
            </DialogFooter>
         </form>
      </DialogContent>
   )
}
