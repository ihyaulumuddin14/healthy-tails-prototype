'use client'

import Input from '@/app/(auth)/components/Input';
import CalendarInput from '@/components/ui/CalendarInput';
import DashboardContent from '@/components/ui/DashboardContent';
import { showErrorToast, showSuccessToast } from '@/helpers/toastHelper'
import { HistoryCredentials, HistorySchema } from '@/request_schema/HistorySchema';
import React, { useEffect, useState } from 'react'
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import DropdownInput from '@/components/ui/DropdownInput';
import { vaccineEnum } from '@/request_schema/HistorySchema';
import AnimateFillButton from '@/components/ui/AnimateFillButton';
import { createHistoryOfCat } from '@/api/pet.actions';
import api from '@/lib/axiosInstance';
import { Booking } from '@/type/type';
import { changeStatusBooking } from '@/api/booking.actions';
import { useNavigation } from '@/hooks/useNavigation';

type BookingStatusType = {
    status: "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export default function ReportPage({
   params
}: {
   params: Promise<{ id: string, bookingId: string }>
}) {
   const { goReplace } = useNavigation();
   const [isLoading, setIsLoading] = useState(true);
   const [petId, setPetId] = useState<string | null>(null)
   const [bookingId, setBookingId] = useState<string | null>(null)
   const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting },
   } = useForm<HistoryCredentials>({
      resolver: zodResolver(HistorySchema) as Resolver<HistoryCredentials>
   })


   useEffect(() => {
      const fetchData = async () => {
         const { id, bookingId } = await params;

         setPetId(id);
         setBookingId(bookingId);
         setIsLoading(false)
      }

      fetchData();
   }, [params])

   const handleResponseCreateHistory = async (data: HistoryCredentials) => {
      if (petId) {
         const response = await createHistoryOfCat(data, petId);
         if (response.success) {
            const responseStatusChange = await changeStatusBooking({ _id: bookingId as string, value: { status: "COMPLETED" } as BookingStatusType });

            if (responseStatusChange.success) {
               showSuccessToast(response.message);

               goReplace('/admin/dashboard');
            } else {
               showErrorToast(responseStatusChange.error as string);
            }
         } else {
            showErrorToast(response.error as string);
         }
      } else {
         showErrorToast("Pet not found");
      }
   }

   return (
      <DashboardContent title='Pet Report' subtitle='Centralized check-up results to ensure accurate diagnosis and follow-up.'>
         <form onSubmit={handleSubmit(handleResponseCreateHistory)} className='w-full h-fit flex flex-col gap-5'>
            <div className="w-full bg-muted p-3 sm:p-8 rounded-xl border-2 border-border flex flex-col lg:flex-row gap-2">
               <CalendarInput<HistoryCredentials> name="visitDate" control={control} label="Visit Date" error={errors.visitDate?.message} />
               <CalendarInput<HistoryCredentials> name="nextVisitDate" control={control} label="Next Visit Date" error={errors.nextVisitDate?.message} optional/>
            </div>

            <div className="w-full bg-muted p-3 sm:p-8 rounded-xl border-2 border-border flex flex-col gap-2">
               <div className='w-full flex gap-2 lg:flex-row flex-col'>
                  <Input label="Body Weight (kg)" type="number" id="bodyWeight" placeholder="Enter your pet body weight" {...register('bodyWeight', { valueAsNumber: true })} error={errors.bodyWeight?.message} />
                  <Input label="Temperature (°C)" type="number" id="temperature" placeholder="Enter your pet temperature" {...register('temperature', { valueAsNumber: true })} error={errors.temperature?.message} />
               </div>
               
               <label htmlFor="symptoms" className="w-full flex justify-start font-bold gap-1 mt-4 mb-1">
                  Symptoms
                  <span className='text-red-600'>*</span>
               </label>
               <textarea id="symptoms" className={`w-full border border-border rounded-md py-2 px-4 outline-0 backdrop-blur-3xl focus:shadow-md focus:shadow-green-200/50 shadow-sm shadow-border ${errors.symptoms ? 'border-pink-500' : 'border-border'}`} {...register('symptoms')}></textarea>
               <p className={`text-pink-600 text-xs ml-2 ${errors.symptoms ? 'visible' : 'invisible'}`}>
                  {errors.symptoms?.message ?? 'placeholder'}
               </p>

               <label htmlFor="diagnosis" className="w-full flex justify-start font-bold gap-1 mt-4 mb-1">
                  Diagnosis
                  <span className="font-light">(optional)</span>
               </label>
               <textarea id="diagnosis" className="w-full border border-border rounded-md py-2 px-4 outline-0 backdrop-blur-3xl focus:shadow-md focus:shadow-green-200/50 shadow-sm shadow-border" {...register('diagnosis')}></textarea>
            </div>

            <div className='w-full bg-muted p-3 sm:p-8 rounded-xl border-2 border-border flex flex-col gap-2'>
               <DropdownInput<HistoryCredentials> name="vaccinesGiven" label="Vaccines Given" control={control} error={errors.vaccinesGiven?.message as string | undefined} allowNone optional
                  options={vaccineEnum.map(vaccine => ({
                     value: [vaccine],
                     label: vaccine
                  }))}/>
               <Input label="Injection Site" type="text" id="injectionSite" placeholder="Enter your pet injection site" {...register('injectionSite')} error={errors.injectionSite?.message} optional/>
            </div>

            <AnimateFillButton isLoading={isSubmitting} type="submit" model="fill" width="auto" className='self-end'>Finish</AnimateFillButton>
         </form>
      </DashboardContent>
   )
}
