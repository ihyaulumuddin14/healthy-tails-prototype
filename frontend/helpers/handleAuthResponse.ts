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
   onSubmitResendOTP
} from '@/api/auth.actions'
import { showErrorToast, showSuccessToast, showLoadingToast } from './toastHelper';
import verifyStore from "@/stores/verifyStore";
import axios, { AxiosError } from 'axios';

type Props = {
   authType: 'login' | 'register' | 'forgot-password' | 'resend-otp' | 'verify-otp' | 'reset-password',
   data?: LoginCredentials | RegisterCredentials | ForgotPasswordCredentials | VerifyOTPCredentials | ResetPasswordCredentials | LogoutCredentials
   action: (arg?: string) => void
}

async function replaceBaseOnRole(accessToken: string, action: (arg?: string) => void) {
   showLoadingToast('Redirecting...');
   try {

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
         headers: {
            Authorization: `Bearer ${accessToken}`
         }
      });

      const user = response.data.user;

      if (user.role === 'ADMIN') {
         action('/admin/dashboard');
      } else if (user.role === 'USER') {
         action('/user/profile');
      }
   } catch (error) {
      let errorMessage = 'An error occurred while redirecting. Please try again.';

      const axiosError = error as AxiosError<{ message: string }>

      errorMessage =
         axiosError.response?.data.message ||
         axiosError.message ||
         'An error occurred while redirecting. Please try again.';

      showErrorToast(errorMessage);
   }
}

export async function handleAuthResponse({ authType, data, action }: Props) {
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
      default:
         break;
   }

   if (response) {
      if (response.success) {
         showSuccessToast(response.message as string);

         const redirectMap: Record<string, () => void> = {
            'login': () => {
               replaceBaseOnRole(response.accessToken, action);
            },
            'register': () => {
               verifyStore.getState().setEmail({
                  email: (data as { email: string }).email,
                  updatedAt: Date.now()
               });
               action('/varify-otp')
            },
            'forgot-password': () => { },
            'resend-otp': () => {
               verifyStore.getState().setEmail({
                  email: (data as { email: string }).email,
                  updatedAt: Date.now()
               });
            },
            'verify-otp': () => {
               verifyStore.getState().clearEmail();
               replaceBaseOnRole(response.accessToken, action);
            },
            'reset-password': () => {
               action("/login");
            }
         }

         const doRedirect = redirectMap[authType];
         if (doRedirect) doRedirect();

      } else {
         showErrorToast(response.message as string);
      }
   } else {
      return null
   }
}