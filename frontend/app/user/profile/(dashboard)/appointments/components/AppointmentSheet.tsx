'use client'

import Input from "@/app/(auth)/components/Input"
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
import { BookingCredentials, BookingUICredentials, BookingUISchema, DisableBookingUICredentials, DisableBookingUISchema } from "@/schema/PetSchema"
import { dialogStore } from "@/stores/dialogStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@/hooks/useNavigation"
import { useEffect } from "react"
import { userStore } from "@/stores/userStore"
import { useForm } from "react-hook-form"
import CalendarInput from "@/components/ui/CalendarInput"
import useSWR from "swr"
import api from "@/lib/axiosInstance"
import usePets from "@/hooks/usePets"
import useUser from "@/hooks/useUser"
import { createBooking } from "@/api/booking.actions"
import { showErrorToast, showSuccessToast } from "@/helpers/toastHelper"
import { Booking } from "@/type/type"
import AnimateFillButton from "@/components/ui/AnimateFillButton"
import useBookings from "@/hooks/useBookings"

const fetcher = (url: string) => api.get(url).then(res => res.data);

export function AppointmentSheet() {
   const { pets } = usePets();
   const { user } = useUser();
   const { bookings, mutateBookings } = useBookings();
   const { goPush } = useNavigation()
   const services = userStore((state) => state.services)
   const setServices = userStore((state) => state.setServices)
   const setBooking = dialogStore((state) => state.setBooking)
   const setDialogPetMode = dialogStore((state) => state.setDialogPetMode)

   const shouldFetch = !services

   const { data } = useSWR(
      shouldFetch ? '/services/' : null,
      fetcher,
      {
         revalidateOnFocus: false,
         shouldRetryOnError: false
      }
   )

   if (data && !services) setServices(data.services);

   const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors, isSubmitting },
   } = useForm<BookingUICredentials>({
      resolver: zodResolver(BookingUISchema)
   })

   const disableForm = useForm<DisableBookingUICredentials>({
      resolver: zodResolver(DisableBookingUISchema)
   })

   const petId = watch('petId')
   const pet = pets?.find((pet) => pet._id === petId)
   const serviceId = watch('serviceId')
   const service = services?.find((service) => service._id === serviceId) ?? null

   useEffect(() => {
      if (user) {
         disableForm.setValue('email', user.email)
         disableForm.setValue('name', user.name)
      }

      if (petId && pets) {
         if (pet) {
            disableForm.setValue('petName', pet.name)
            disableForm.setValue('type', pet.type)
            disableForm.setValue('race', pet.race)
            disableForm.setValue('age', pet.age)
            disableForm.setValue('gender', pet.gender)
         }
      }
   }, [user, petId, pets, disableForm, pet])

   const handleSubmitData = async (data: BookingUICredentials) => {
      const newData: BookingCredentials = { ...data, bookingDate: data.bookingDate.toISOString() };
      
      const response = await createBooking(newData);

      if (response.success) {
         showSuccessToast(response.message)
         setBooking(response.booking as Booking)
         setDialogPetMode('booked')

         mutateBookings(
            (prev: {message: string, bookings: Booking[]}) => ({
               ...prev,
               bookings: [
                  ...prev.bookings,
                  response.booking
               ]}
            ),
            true
         )
      } else {
         showErrorToast(response.error as string)
      }
   }

   return (
      <SheetContent side="right">
         <SheetHeader>
            <SheetTitle>Fill Out Our Form to Book an Appointment</SheetTitle>
            <SheetDescription>
               Make sure to fill out all the fields correctly <br />
               If you don`t have a pet option, you can add one at{" "}
               <span
                  onClick={() => {
                     goPush('/user/profile/pets')
                     setDialogPetMode('petAdd')
                  }}
                  className="text-primary cursor-pointer hover:underline">
                  here
               </span>
            </SheetDescription>
         </SheetHeader>

         <div className="w-full h-full overflow-y-auto p-5">
            <form id="appointment-form" className="w-full" onSubmit={handleSubmit(handleSubmitData)}>

               <Divider>Owner</Divider>
               <Input label="Name" type="text" id="name" placeholder="Enter your name" {...disableForm.register('name')} disabled />
               <Input label="Email" type="email" id="email" placeholder="Enter your email phone" {...disableForm.register('email')} disabled />

               <Divider>Pet</Divider>
               <div className="w-full grid sm:grid-cols-2 gap-4 items-start">
                  <DropdownInput name="petId" label="Name" control={control} error={errors.petId?.message}
                     options={
                        pets ? pets.filter(pet => {
                           if (bookings.some(booking => booking.pet._id === pet._id && (booking.status === 'COMPLETED' || booking.status === 'CANCELLED'))) return pet
                           else if (!bookings.some(booking => booking.pet._id === pet._id)) return pet
                        }).map((pet) => ({ value: pet._id, label: pet.name })) : []
                     }
                  />
                  <Input label="Pet Name" type="text" id="petName" placeholder="Enter your Pet Name" {...disableForm.register('petName')} disabled error={disableForm.formState.errors.petName?.message} />
                  <DropdownInput name="type" label="Type" control={disableForm.control} disabled error={disableForm.formState.errors.type?.message}
                     options={[
                        { value: 'Cat', label: 'Cat' },
                        { value: 'Dog', label: 'Dog' },
                     ]} />
                  <DropdownInput name="gender" label="Gender" control={disableForm.control} disabled error={disableForm.formState.errors.gender?.message}
                     options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                     ]} />
                  <Input label="Race" type="text" id="race" placeholder="Enter your pet race" {...disableForm.register('race')} disabled error={disableForm.formState.errors.race?.message} />
                  <Input label="Age" type="number" id="age" placeholder="Enter your pet age" {...disableForm.register('age')} disabled error={disableForm.formState.errors.age?.message} />
               </div>

               <Divider>Details</Divider>
               <div className="w-full grid sm:grid-cols-2 gap-4 items-start">
                  <div className="w-full h-fit">
                     <DropdownInput label="Service" name="serviceId" control={control} error={errors.serviceId?.message}
                        options={services ? services.map(service => ({ value: service._id, label: service.name })) : []}
                     />
                     {service && <p className="text-gray-400 text-xs">Estimated service duration: {service.estimatedDurationMinutes} minutes</p>}
                  </div>

                  <CalendarInput name="bookingDate" control={control} label="Booking Date" error={errors.bookingDate?.message} />
               </div>
               <label htmlFor="notes" className="w-full flex justify-start font-bold gap-1 mt-4 mb-1">
                  Notes
                  <span className="font-light">(optional)</span>
               </label>
               <textarea id="notes" className="w-full border border-border rounded-md py-2 px-4 outline-0 backdrop-blur-3xl focus:shadow-md focus:shadow-green-200/50 shadow-sm shadow-border" {...register('notes')}></textarea>
            </form>
         </div>

         <SheetFooter>
            <AnimateFillButton form="appointment-form" isLoading={isSubmitting} type="submit" model="fill" width="full">Book</AnimateFillButton>
            <SheetClose asChild>
               <AnimateFillButton model='outline' type="button" width="full">Cancel</AnimateFillButton>
            </SheetClose>
         </SheetFooter>
      </SheetContent>
   )
}
