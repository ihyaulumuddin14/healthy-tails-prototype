'use client'

import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '@/components/ui/AnimateFillButton'
import { RegisterSchema, RegisterCredentials } from '../../../schema/AuthSchema'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleAuthResponse } from '../../../helpers/handleAuthResponse'
import { useNavigation } from '@/hooks/useNavigation'

const Register = () => {
   const { goPush } = useNavigation()
   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
      watch
   } = useForm<RegisterCredentials>({
      resolver: zodResolver(RegisterSchema),
   })
   const [isPasswordValid, setIsPasswordValid] = useState({
      lengthValid: false,
      upperCaseValid: false,
      lowerCaseValid: false,
      specialCharValid: false,
      numberValid: false
   });
   const password = watch("password");

   useEffect(() => {
      if (password || password === "") {
         setIsPasswordValid({
            lengthValid: password.length >= 8,
            upperCaseValid: /[A-Z]/.test(password),
            lowerCaseValid: /[a-z]/.test(password),
            specialCharValid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            numberValid: /[0-9]/.test(password)
         });
      }
   }, [password]);

   const handleResponseRegister = async (data: RegisterCredentials) => {
      await handleAuthResponse({ authType: 'register', data, action: goPush as (arg?: string) => void });
   }

   return (
      <form action="" onSubmit={handleSubmit(handleResponseRegister)}>
         <AuthLayout
            title='Register'
            subtitle='Please sign up before use the app'
            type='register'>
            <Input
               label='Fullname'
               type='text'
               id='fullname'
               placeholder='Enter your fullname'
               {...register('name')}
               error={errors.name?.message} />
            <Input
               label='Email'
               type='email'
               id='email'
               placeholder='Enter your phone email'
               {...register('email')}
               error={errors.email?.message} />
            <Input
               label='Password'
               type='password'
               id='password'
               placeholder='Enter your password'
               {...register('password')}
               error={errors.password?.message} />
            <div className='flex flex-col gap-1 my-3 w-full text-xs'>
               <p className='text-sm'>Password must contain:</p>
               <p className={`opacity-80 ${isPasswordValid.lengthValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lengthValid ? '✓' : '-'} At least 8 characters</p>
               <p className={`opacity-80 ${isPasswordValid.upperCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.upperCaseValid ? '✓' : '-'} One upper case letter</p>
               <p className={`opacity-80 ${isPasswordValid.lowerCaseValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.lowerCaseValid ? '✓' : '-'} One lower case letter</p>
               <p className={`opacity-80 ${isPasswordValid.specialCharValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.specialCharValid ? '✓' : '-'} One special character or space</p>
               <p className={`opacity-80 ${isPasswordValid.numberValid ? "text-[var(--color-tertiary)]" : "text-[var(--text)]"}`}>{isPasswordValid.numberValid ? '✓' : '-'} One number</p>
            </div>
            <SubmitButton isLoading={isSubmitting} model="fill" width='full'>Register</SubmitButton>
         </AuthLayout>
      </form>
   )
}

export default Register;