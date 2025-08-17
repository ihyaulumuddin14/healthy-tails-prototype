'use client'

import AuthLayout from '../../AuthLayout'
import Input from '../../components/Input'
import SubmitButton from '@/components/ui/AnimateFillButton'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordUISchema, ResetPasswordUICredentials, ResetPasswordCredentials } from '../../../../schema/AuthSchema'
import { handleAuthResponse } from '../../../../helpers/handleAuthResponse'
import { useNavigation } from '@/hooks/useNavigation'

const ResetPassword = () => {
   const params = useParams();
   const resetToken = params.resetToken;
   const { goReplace } = useNavigation();

   const [isPasswordValid, setIsPasswordValid] = useState({
      lengthValid: false,
      upperCaseValid: false,
      lowerCaseValid: false,
      specialCharValid: false,
      numberValid: false
   });

   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
      watch
   } = useForm<ResetPasswordUICredentials>({
      resolver: zodResolver(ResetPasswordUISchema),
   })

   const newPassword = watch("newPassword");

   useEffect(() => {
      if (newPassword) {
         setIsPasswordValid({
            lengthValid: newPassword.length >= 8,
            upperCaseValid: /[A-Z]/.test(newPassword),
            lowerCaseValid: /[a-z]/.test(newPassword),
            specialCharValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
            numberValid: /[0-9]/.test(newPassword)
         });
      }
   }, [newPassword])


   const handleResponseResetPassword = async (data: ResetPasswordUICredentials) => {
      const dto: ResetPasswordCredentials = {
         resetToken: resetToken as string,
         password: data.newPassword
      };
      await handleAuthResponse({ authType: 'reset-password', data: dto, action: goReplace as (arg?: string) => void });
   };


   return (
      <form action="" onSubmit={handleSubmit(handleResponseResetPassword)}>
         <AuthLayout title='Reset Password' subtitle='Please reset your password' type='reset'>
            <Input
               label='New Password'
               type='password'
               id='newPassword'
               placeholder='Enter your new password'
               {...register("newPassword")}
               error={errors.newPassword?.message}
            />
            <Input
               label='Confirm Password'
               type='password'
               id='confirmPassword'
               placeholder='Enter your confirm password'
               {...register("confirmPassword")}
               error={errors.confirmPassword?.message}
            />
            <div className='flex flex-col gap-1 my-3 w-full text-xs'>
               <p className='text-sm'>Password must contain:</p>
               <p className={`opacity-80 ${isPasswordValid.lengthValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lengthValid ? '✓' : '-'} At least 8 characters</p>
               <p className={`opacity-80 ${isPasswordValid.upperCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.upperCaseValid ? '✓' : '-'} One upper case letter</p>
               <p className={`opacity-80 ${isPasswordValid.lowerCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lowerCaseValid ? '✓' : '-'} One lower case letter</p>
               <p className={`opacity-80 ${isPasswordValid.specialCharValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.specialCharValid ? '✓' : '-'} One special character or space</p>
               <p className={`opacity-80 ${isPasswordValid.numberValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.numberValid ? '✓' : '-'} One number</p>
            </div>
            <SubmitButton isLoading={isSubmitting} type='submit' model='fill' width='full'>Reset Password</SubmitButton>
         </AuthLayout>
      </form>
   )
}

export default ResetPassword;