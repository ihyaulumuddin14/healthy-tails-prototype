import {
   LoginCredentials,
   RegisterCredentials,
   ForgotPasswordCredentials,
   ResetPasswordCredentials,
   VerifyOTPCredentials,
   TokenResponse
} from "../schema/AuthSchema";
import axios, { AxiosError } from 'axios'
import api from "./axiosInstance";


export async function onSubmitLogin (credential: LoginCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string,
   accessToken?: TokenResponse
}> {
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credential, {
         withCredentials: true,
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {
         success: true,
         message: response.data.message,
         accessToken: response.data.accessToken
      }
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return {success: false, error: errorMessage}
   }
};

export async function onSubmitRegister (credential: RegisterCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, credential, {
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })

      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while registering. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }

      return {success: false, error: errorMessage}
   }
}

export async function onSubmitForgotPassword (credential: ForgotPasswordCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, credential, {
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while sending OTP. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }
      
      return {success: false, error: errorMessage}
   }
}

export async function onSubmitResendOTP (credential: { email: string }) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`, credential, {
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while resending OTP. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }
      
      return {success: false, error: errorMessage}
   }
}


export async function onSubmitVerifyOTP (credential: VerifyOTPCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string,
   accessToken?: TokenResponse
}> {
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, credential, {
         withCredentials: true,
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while verifying OTP. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }
      
      return {success: false, error: errorMessage}
   }
}


export async function onSubmitResetPassword (credential: ResetPasswordCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, credential, {
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while resetting password. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }
      
      return {success: false, error: errorMessage}
   }
}


export async function onSubmitLogout () : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
         withCredentials: true,
         headers: { 'Content-Type': 'application/json' },
         signal: AbortSignal.timeout(5000)
      })
      
      return {success: true, message: response.data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while logging out. Please try again.'
      
      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;
         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
      }
      
      return {success: false, error: errorMessage}
   }
}

export async function refresh(): Promise<{success: boolean, accessToken?: string, error?: string}> {
   try {
      const response = await api.post(`/auth/refresh`, {}, {
         withCredentials: true,
      })

      return {success: true, accessToken: response.data.accessToken}
   } catch (error) {
      let errorMessage = 'An error occurred while refreshing. Please try again.'

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
         console.log(axiosError.message)
      }

      return {success: false, error: errorMessage}
   }
}