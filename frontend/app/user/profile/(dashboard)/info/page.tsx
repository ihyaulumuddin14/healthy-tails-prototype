'use client'

import { DialogTrigger } from "@/components/ui/dialog"
import PhotoDialog from "@/app/user/profile/components/PhotoDialog"
import { UpdateUserCredentials, UpdateUserSchema } from "@/request_schema/UserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import Image from "next/image"
import Input from "@/app/(auth)/components/Input"
import DashboardContent from "@/components/ui/DashboardContent"
import { useNavigation } from "@/hooks/useNavigation"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertConfirmation } from "@/components/ui/AlertConfirmation"
import { deleteMe, updateUser } from "@/api/user.actions"
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helpers/toastHelper"
import useUser from "@/hooks/useUser"
import { User } from "@/type/type"
import { useEffect } from "react"
import { userStore } from "@/stores/userStore"
import AnimateFillButton from "@/components/ui/AnimateFillButton"

export default function AccountInfoPage() {
   const { user } = useUser();
   const setUser = userStore((state) => state.setUser);
   const { goReplace } = useNavigation();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { isSubmitting, errors }
   } = useForm<UpdateUserCredentials>({
      resolver: zodResolver(UpdateUserSchema)
   })

   const handleResponseUpdateUser = async (data: UpdateUserCredentials) => {
      const response = await updateUser(data);

      if (response.success) {
         showSuccessToast(response.message)
         setUser(response.user as User);
      } else {
         showErrorToast(response.error as string)
      }
   }

   const handleResponseDeleteUser = async () => {
      showLoadingToast('Deleting account...');
      const response = await deleteMe();

      if (response.success) {
         showSuccessToast(response.message)
         goReplace('/home');
         setUser(null);
      } else {
         showErrorToast(response.error as string)
      }
   }

   useEffect(() => {
      if (user.name) {
         setValue('name', user.name);
      }
   }, [setValue, user, user.name])

   return (
      <DashboardContent type="user" subtitle="Here’s where you can check and update your personal details.">
         <AlertDialog>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
               {/* Photo */}
               <div className="w-full bg-muted p-5 sm:p-8 flex flex-col justify-center items-center rounded-xl gap-5 border-2 border-border">
                  <h1 className="w-full flex justify-start text-[var(--color-foreground)] text-2xl">Profile Photo</h1>

                  <div className="w-full h-full flex edit-photo-wrapper items-center">
                     <div className="relative h-[150px] xl:h-[200px] w-fit aspect-square">
                        <Image src={user.photoUrl} width={200} height={200} alt="Profile" className="w-full h-full rounded-full object-cover object-top" />
                        <DialogTrigger asChild>
                           <div className="edit-photo-badge">
                              <svg className="w-5 h-5 text-[var(--color-background)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                              </svg>
                           </div>
                        </DialogTrigger>
                     </div>
                     <DialogTrigger asChild>
                        <button className="edit-photo-button w-fit h-fit bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] py-2 px-5 rounded-full text-[clamp(0.8rem,1.8vw,1.1rem)] hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out flex items-center font-semibold shrink-0">Change Photo</button>
                     </DialogTrigger>
                  </div>
               </div>

               <div className="w-full bg-muted p-3 sm:p-8 rounded-xl border-2 border-border">
                  <h1 className="w-full flex justify-start text-[var(--color-foreground)] text-2xl mb-7 ml-2">Your Details</h1>
                  <form className="flex flex-col items-end" onSubmit={handleSubmit(handleResponseUpdateUser)}>
                     <Input
                        label="Name"
                        type="text"
                        id="name"
                        placeholder={user?.name || ''}
                        {...register('name')}
                        error={errors.name?.message}
                     />

                     <Input
                        label="Email"
                        type="email"
                        id="email"
                        placeholder={user?.email || ''}
                        value={user?.email || ''}
                        name="email"
                        disabled
                     />

                     <AnimateFillButton isLoading={isSubmitting} type="submit" model="fill" width='auto'>Change</AnimateFillButton>
                  </form>
               </div>

               <AlertDialogTrigger className="xl:col-start-2 justify-self-end mt-10">
                  <AnimateFillButton type="button" model="danger" width='auto'>
                     <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                     </svg>
                     Delete Account
                  </AnimateFillButton>
               </AlertDialogTrigger>
            </div>

            <PhotoDialog/>
            <AlertConfirmation heading="Delete Account" description="Are you sure you want to delete your account?" submitLabel="Delete" isDanger={true} onSubmit={handleResponseDeleteUser} />
         </AlertDialog>
      </DashboardContent>
   )
}
