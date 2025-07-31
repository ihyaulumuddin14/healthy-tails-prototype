'use client'

import AuthLayout from "../AuthLayout"
import Input from "../components/Input"
import SubmitButton from "@/components/ui/BasicButton"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordCredentials, ForgotPasswordSchema } from "../schemas/AuthSchema"
import { handleFormResponse } from "../HandleFormResponse"


const RequestReset = () => {

   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors }
   } = useForm<ForgotPasswordCredentials>({
      resolver: zodResolver(ForgotPasswordSchema)
   })

   const handleResponseRequestReset = async (data: ForgotPasswordCredentials) => {
      await handleFormResponse({ authType: 'forgot-password', data });
   };

   return (
      <form action="" onSubmit={handleSubmit(handleResponseRequestReset)}>
         <AuthLayout
            title="Forgot Password"
            subtitle="Please input a registered email to receive the OTP"
            type="email-reset">
               <Input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Enter your phone email"
                  {...register('email')}
                  error={errors.email?.message}
                  />
               <SubmitButton isLoading={isSubmitting} type="submit" width="full" model="fill">Send OTP</SubmitButton>
         </AuthLayout>
      </form>
   )
}

export default RequestReset;