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
   onSubmitLogout
} from '@/lib/actions'
import { toast } from 'sonner'
import { redirect } from "next/navigation";
import useVerifyStore from "@/stores/useVerifyStore";
import { removeTokenFromStorage, setTokenToStorage } from './HandleTokenState';


type Props = {
   authType: 'login' | 'register' | 'forgot-password' | 'resend-otp' | 'verify-otp' | 'reset-password' | 'logout',
   data: LoginCredentials | RegisterCredentials | ForgotPasswordCredentials | VerifyOTPCredentials | ResetPasswordCredentials | LogoutCredentials
}

export async function handleFormResponse({ authType, data }: Props) {
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
         
      // case 'resend-otp':
      //    response = await onSubmitRequestReset(data as { email: string });
      //    break;

      case 'verify-otp':
         response = await onSubmitVerifyOTP(data as VerifyOTPCredentials);
         break;

      case 'reset-password':
         response = await onSubmitResetPassword(data as ResetPasswordCredentials);
         break;

      case 'logout':
         response = await onSubmitLogout(data as LogoutCredentials);
         console.log(data);
         break;

      default:
         break;
   }

   if (response) {
      if (response.success) {
         toast.success(response.message, { duration: 2000 });

         const redirectMap: Record<string, () => void> = {
            'login': () => {
               setTokenToStorage(response.tokens);
               redirect('/')
            },
            'register': () => {
               useVerifyStore.setState({ email: (data as { email: string }).email});
               redirect('/verify-otp')
            },
            'forgot-password': () => {},
            'verify-otp': () => {
               setTokenToStorage(response.tokens);
               redirect('/')
            },
            'reset-password': () => {
               useVerifyStore.getState().clearEmail();
               redirect('/login')
            },
            'logout': () => {
               removeTokenFromStorage();
               redirect('/')
            }
         }

         const doRedirect = redirectMap[authType];

         if (doRedirect) {
            console.log('redirect found');
            setTimeout(() => {
               doRedirect();
            }, 2000)
         } else {
            console.log('redirect not found');
         }

      } else {
         toast.error(response.error, { duration: 2000 });
         console.log(response.error);
      }
   } else {
      return null
   }
}