import { changeUserPassword } from "@/api/user.actions";
import Input from "@/app/(auth)/components/Input";
import AnimateFillButton from "@/components/ui/AnimateFillButton";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { showSuccessToast, showErrorToast } from "@/helpers/toastHelper";
import { UpdatePasswordUserCredentials, UpdatePasswordUserSchema } from "@/request_schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

export default function AdminPasswordDialog() {
      const {
      register,
      handleSubmit,
      watch,
      formState: { isSubmitting, errors }
   } = useForm<UpdatePasswordUserCredentials>({
      resolver: zodResolver(UpdatePasswordUserSchema)
   })
   const [isPasswordValid, setIsPasswordValid] = useState({
      lengthValid: false,
      upperCaseValid: false,
      lowerCaseValid: false,
      specialCharValid: false,
      numberValid: false
   });
   const newPassword = watch("newPassword");

   useEffect(() => {
      if (newPassword || newPassword === "") {
         setIsPasswordValid({
            lengthValid: newPassword.length >= 8,
            upperCaseValid: /[A-Z]/.test(newPassword),
            lowerCaseValid: /[a-z]/.test(newPassword),
            specialCharValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
            numberValid: /[0-9]/.test(newPassword)
         });
      }
   }, [newPassword]);
   
   const handleResponseChangePassword = async (data: UpdatePasswordUserCredentials) => {
      const response = await changeUserPassword(data);
      if (response.success) {
         showSuccessToast(response.message)
      } else {
         showErrorToast(response.error as string)
      }
   }

   return (
      <DialogContent>
         <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
         </DialogHeader>
         
         <div className="w-full bg-muted p-4 sm:p-8 rounded-xl border-2 border-border">
            <form action="" className="flex flex-col items-end" onSubmit={handleSubmit(handleResponseChangePassword)}>
               <Input
                  type="password"
                  label="Current Password"
                  id="oldPassword"
                  placeholder="Enter your current password"
                  {...register('oldPassword')}
                  error={errors.oldPassword?.message}
               />

               <Input
                  type="password"
                  label="New Password"
                  id="newPassword"
                  placeholder="Enter your new password"
                  {...register('newPassword')}
                  error={errors.newPassword?.message}
               />

               <div className='flex flex-col gap-1 my-3 w-full text-xs'>
                  <p className='text-sm'>Password must contain:</p>
                  <p className={`opacity-80 ${isPasswordValid.lengthValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lengthValid ? '✓' : '-'} At least 8 characters</p>
                  <p className={`opacity-80 ${isPasswordValid.upperCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.upperCaseValid ? '✓' : '-'} One upper case letter</p>
                  <p className={`opacity-80 ${isPasswordValid.lowerCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lowerCaseValid ? '✓' : '-'} One lower case letter</p>
                  <p className={`opacity-80 ${isPasswordValid.specialCharValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.specialCharValid ? '✓' : '-'} One special character or space</p>
                  <p className={`opacity-80 ${isPasswordValid.numberValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.numberValid ? '✓' : '-'} One number</p>
               </div>

               <AnimateFillButton isLoading={isSubmitting} type="submit" model="fill" width='auto'>Change</AnimateFillButton>
            </form>
         </div>
      </DialogContent>
   )
}
