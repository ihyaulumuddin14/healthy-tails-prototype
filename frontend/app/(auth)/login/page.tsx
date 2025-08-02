'use client'

import AuthLayout from '../AuthLayout';
import Input from '../components/Input';
import SubmitButton from '@/components/ui/BasicButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginCredentials, LoginSchema } from '../schemas/AuthSchema';
import { handleFormResponse } from '../HandleFormResponse'
import RememberMe from './components/RememberMe';
import { useRouter } from "next/navigation"

const Login = () => {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors }
   } = useForm<LoginCredentials>({
      resolver: zodResolver(LoginSchema)
   })

   const handleResponseLogin = async (data: LoginCredentials) => {
      await handleFormResponse({ authType: 'login', data, router });
   };

   return (
      <form onSubmit={handleSubmit(handleResponseLogin)}>
         <AuthLayout
            title="Login"
            subtitle="Welcome back, Pawrents!"
            type="login"
            >
            <Input
               label="Email"
               type="email"
               id="email"
               placeholder="Enter your email"
               {...register('email')}
               error={errors.email?.message}
            />

            <Input
               label="Password"
               type="password"
               id="password"
               placeholder="Enter your password"
               forgotPassword
               {...register('password')}
               error={errors.password?.message}
            />

            <RememberMe
               {...register('rememberMe')}
            />

            <SubmitButton isLoading={isSubmitting} type="submit" model="fill" width='full'>Login</SubmitButton>
         </AuthLayout>
      </form>
  );
};

export default Login;
