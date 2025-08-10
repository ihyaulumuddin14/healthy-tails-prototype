'use client'

import Input from "@/app/(auth)/components/Input"
import BasicButton from "@/components/ui/BasicButton"
import { CalendarInput } from "@/components/ui/CalendarInput"
import { Checkbox } from "@/components/ui/checkbox"
import Divider from "@/components/ui/Divider"
import DropdownInput from "@/components/ui/DropdownInput"
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AppointmentCredentials, AppointmentSchema } from "@/schema/PetSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export function AppointmentSheet() {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
   } = useForm<AppointmentCredentials>({
      resolver: zodResolver(AppointmentSchema)
   })

   return (
      <SheetContent side="right">
         <SheetHeader>
            <SheetTitle>Fill Out Our Form to Book an Appointment</SheetTitle>
            <SheetDescription>
               Make sure to fill out all the fields correctly
            </SheetDescription>
         </SheetHeader>
        
         <div className="w-full h-full overflow-y-auto p-5">
            <form action="" className="w-full">

               <Divider>Owner</Divider>
               <Input name="email" label="Email" type="email" id="email" placeholder="Enter your email phone" />
               <Input name="phone" label="Phone" type="number" id="phone" placeholder="Enter your phone number" />

               <Divider>Pet</Divider>
               <div className="w-full grid sm:grid-cols-2 gap-4 items-center">
                  <div className="w-full h-fit flex gap-2 items-center py-2 px-3 mt-2 rounded-md bg-muted">
                     <Checkbox id="checkboxPet"/>
                     <label htmlFor="checkboxPet" className="cursor-pointer">Book for an existing pet</label>
                  </div>
                  <DropdownInput name="name" label="Name" control={control} contentWidth="w-full"
                     options={[
                        { value: 'Mocky', label: 'Mocky' },
                     ]}/>
                  <DropdownInput name="type" label="Type" control={control}
                     options={[
                        { value: 'Cat', label: 'Cat' },
                        { value: 'Dog', label: 'Dog' },
                     ]}/>
                  <DropdownInput name="gender" label="Gender" control={control}
                     options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                     ]}/>
                  <Input name="race" label="Race" type="text" id="race" placeholder="Enter your pet race" />
                  <Input name="age" label="Age" type="number" id="age" placeholder="Enter your pet age" />
               </div>

               <Divider>Details</Divider>
               <div className="w-full grid sm:grid-cols-2 gap-4 items-center">
                  <DropdownInput name="service" label="Service" control={control}
                     options={[
                        { value: 'Physical Exam', label: 'Physical Exam' },
                        { value: 'Vaccination', label: 'Vaccination' },
                        { value: 'Ward Unit', label: 'Ward Unit' },
                        { value: 'Surgery / Sterilization', label: 'Surgery / Sterilization' },
                        { value: 'Therapeutic Diet', label: 'Therapeutic Diet' },
                        { value: 'Other', label: 'Other' },
                     ]}/>
                  <CalendarInput name="date" control={control} label="Date"/>
               </div>

               <Input name='note' label="Note (optional)" type="text" id="note" placeholder="Enter your pet note"/>

               <div className="w-full grid sm:grid-cols-2 gap-4 items-center">
                  <div className='w-full flex flex-col font-bold'>
                     <label htmlFor='petConditionImage'>
                        Photo
                     </label>
                     <input type="file" name="file" id="" className="py-1 px-2 border border-border font-normal rounded-md"/>
                  </div>
               </div>
            </form>
         </div>

         <SheetFooter>
            <BasicButton type="submit" model="fill" width="full">Submit</BasicButton>
            <SheetClose asChild>
               <BasicButton model='outline' type="button" width="full">Cancel</BasicButton>
            </SheetClose>
         </SheetFooter>
      </SheetContent>
   )
}
