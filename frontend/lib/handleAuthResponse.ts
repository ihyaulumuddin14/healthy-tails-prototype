'use client'

import {
   ForgotPasswordCredentials,
   LoginCredentials,
   LogoutCredentials,
   RegisterCredentials,
   ResetPasswordCredentials,
   VerifyOTPCredentials,
} from '../schema/AuthSchema'
import {
   onSubmitLogin,
   onSubmitRegister,
   onSubmitForgotPassword,
   onSubmitVerifyOTP,
   onSubmitResetPassword,
   onSubmitLogout,
   onSubmitResendOTP
} from '@/lib/auth.actions'
import { toast } from 'sonner'
import useVerifyStore from "@/stores/useVerifyStore";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useAuthStore } from '@/stores/useAuthStore';
import axios, { AxiosError } from 'axios';

type Props = {
   authType: 'login' | 'register' | 'forgot-password' | 'resend-otp' | 'verify-otp' | 'reset-password' | 'logout',
   data?: LoginCredentials | RegisterCredentials | ForgotPasswordCredentials | VerifyOTPCredentials | ResetPasswordCredentials | LogoutCredentials
   router: AppRouterInstance
}

async function replaceBaseOnRole(accessToken: string, router: AppRouterInstance) {
   toast.loading('Redirecting...');
   try {
      useAuthStore.getState().setAccessToken(accessToken);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
         headers: {
            Authorization: `Bearer ${accessToken}`
         }
      });

      const user = response.data.user;
      useAuthStore.getState().setUser(user);

      if (user.role === 'ADMIN') {
         router.replace('/admin/dashboard');
      } else if (user.role === 'USER') {
         router.replace('/user/profile');
      }
   } catch (error) {
      let errorMessage = 'An error occurred while redirecting. Please try again.';

      const axiosError = error as AxiosError<{ message: string }>

      errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while redirecting. Please try again.';

      toast.dismiss();
      toast.error(errorMessage, { duration: 2000 });
   } finally {
      toast.dismiss();
   }
}

export async function handleAuthResponse({ authType, data, router }: Props) {
   let response;

   switch (authType) {
      case 'login':
         response = await onSubmitLogin(data as LoginCredentials);
         break;

      case 'register':
         response = await onSubmitRegister(data as RegisterCredentials);
         break;

      case 'forgot-password':
         response = await onSubmitForgotPassword(data as ForgotPasswordCredentials);
         break;
         
      case 'resend-otp':
         response = await onSubmitResendOTP(data as { email: string });
         break;

      case 'verify-otp':
         response = await onSubmitVerifyOTP(data as VerifyOTPCredentials);
         break;

      case 'reset-password':
         response = await onSubmitResetPassword(data as ResetPasswordCredentials);
         break;

      case 'logout':
         response = await onSubmitLogout();
         break;

      default:
         break;
   }

   if (response) {
      if (response.success) {
         
         toast.success(response.message, { duration: 2000 });
         
         const redirectMap: Record<string, () => void> = {
            'login': () => {
               replaceBaseOnRole(response.accessToken, router);
            },
            'register': () => {
               useVerifyStore.getState().setEmail({
                  email: (data as { email: string }).email,
                  updatedAt: Date.now()
               });
               router.push('/verify-otp')
            },
            'forgot-password': () => {},
            'resend-otp': () => {
               useVerifyStore.getState().setEmail({
                  email: (data as { email: string }).email,
                  updatedAt: Date.now()
               });
            },
            'verify-otp': () => {
               useVerifyStore.getState().clearEmail();
               replaceBaseOnRole(response.accessToken, router);
            },
            'reset-password': () => {
               router.replace('/login')
            },
            'logout': () => {
               useAuthStore.getState().logout();
               router.replace('/')
            }
         }

         const doRedirect = redirectMap[authType];

         if (doRedirect) {
            setTimeout(() => {
               doRedirect();
            }, 2000)
         }

      } else {
         toast.error(response.error, { duration: 2000 });
      }
   } else {
      return null
   }
}