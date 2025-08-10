'use client'

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import ProfilePhotoDialog from "@/components/ui/ProfilePhotoDialog"
import { updateUser } from "@/lib/user.actions"
import { UpdateUserCredentials, UpdateUserSchema } from "@/schema/UserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import Image from "next/image"
import Input from "@/app/(auth)/components/Input"
import { useAuthStore } from "@/stores/useAuthStore"
import SubmitButton from '@/components/ui/BasicButton';
import DashboardContent from "@/components/ui/DashboardContent"


export default function AccountInfoPage() {
   const user = useAuthStore((state) => state.user);

   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors }
   } = useForm<UpdateUserCredentials>({
      resolver: zodResolver(UpdateUserSchema)
   })

   const handleResponseUpdateUser = async (data: UpdateUserCredentials) => {
      const response = await updateUser(data);
      console.log(response.message || response.error);
   }

   return (
      <DashboardContent type="user">
         <div className="w-full max-w-[1400px] bg-[var(--color-muted)] p-3 sm:p-8 flex justify-between items-center rounded-2xl">
            <Image src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' width={100} height={100} alt="Profile" className="w-20 h-20 rounded-full"/>
            <DialogTrigger asChild>
               <button className="bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] py-2 px-5 rounded-xl text-[clamp(0.8rem,1.8vw,1.1rem)] hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 ease-in-out flex items-center gap-2] font-semibold">Change Photo</button>
            </DialogTrigger>
         </div>

         <div className="w-full max-w-[1400px] bg-[var(--color-muted)] p-4 sm:p-8 rounded-2xl">
            <form className="flex flex-col items-end" onSubmit={handleSubmit(handleResponseUpdateUser)}>
               <Input
                  label="Name"
                  type="text"
                  id="name"
                  placeholder={user?.name || ''}
                  value={user?.name || ''}
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
                  className="cursor-not-allowed opacity-60"
                  disabled
               />

               <SubmitButton isLoading={isSubmitting} type="submit" model="fill" width='auto'>Change</SubmitButton>
            </form>
         </div>
         <ProfilePhotoDialog />
      </DashboardContent>
   )
}
