'use client'

import {
   ForgotPasswordCredentials,
   LoginCredentials,
   LogoutCredentials,
   RegisterCredentials,
   ResetPasswordCredentials,
   VerifyOTPCredentials,
} from './schemas/AuthSchema'
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
import useStore from '@/stores/useStore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';



type Props = {
   authType: 'login' | 'register' | 'forgot-password' | 'resend-otp' | 'verify-otp' | 'reset-password' | 'logout',
   data?: LoginCredentials | RegisterCredentials | ForgotPasswordCredentials | VerifyOTPCredentials | ResetPasswordCredentials | LogoutCredentials
   router: AppRouterInstance
}

export async function handleFormResponse({ authType, data, router }: Props) {
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
               useStore.getState().setAccessToken(response.accessToken)
               router.replace('/')
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
               useStore.getState().setAccessToken(response.accessToken);
               router.replace('/')
            },
            'reset-password': () => {
               router.replace('/login')
            },
            'logout': () => {
               useStore.getState().setAccessToken(null);
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