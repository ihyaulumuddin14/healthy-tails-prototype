'use server'

import {
   LoginCredentials,
   RegisterCredentials,
   ForgotPasswordCredentials,
   ResetPasswordCredentials,
   VerifyOTPCredentials,
   TokenResponse,
   LogoutCredentials
} from "../app/(auth)/schemas/AuthSchema";


export async function onSubmitLogin (credential: LoginCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string,
   tokens?: TokenResponse
}> {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/login`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(credential),
      });

      const data = await response.json();

      if (!response.ok) {
         return {success: false, error: data.message}
      }
      
      return {success: true, message: data.message, tokens: data.tokens}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
};

export async function onSubmitRegister (credential: RegisterCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   
   try {
      const responseRegister = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/register`, {
         method: "POST",
         headers: {"Content-Type" : "application/json"},
         body: JSON.stringify(credential)
      })
      
      const dataRegister = await responseRegister.json();
      
      if (!responseRegister.ok) {
         return {success: false, error: dataRegister.message}
      }
      
      return {success: true, message: dataRegister.message}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
}

export async function onSubmitForgotPassword (credential: ForgotPasswordCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   try {
      const responseForgotPassword = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/forgot-password`, {
         method: "POST",
         headers: {"Content-Type" : "application/json"},
         body: JSON.stringify(credential)
      })

      const dataForgotPassword = await responseForgotPassword.json();

      if (!responseForgotPassword.ok) {
         return {success: false, error: dataForgotPassword.message}
      }
      
      return {success: true, message: dataForgotPassword.message}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
}

// export async function onSubmitRequestReset (credential: { email: string }) : Promise<{
//    success: boolean,
//    message?: string,
//    error?: string
// }> {
//    try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/forgot-password`, {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify(credential)
//       })

//       const data = await response.json();
      
//       if (!response.ok) {
//          return {success: false, error: data.message}
//       }
      
//       return {success: true, message: data.message}
//    } catch (error) {
//       return {success: false, error: (error as Error).message}
//    }
// }


export async function onSubmitVerifyOTP (credential: VerifyOTPCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string,
   tokens?: TokenResponse
}> {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/verify-otp`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(credential)
      })

      const data = await response.json();

      if (!response.ok) {
         return {success: false, error: data.message}
      }

      return {success: true, message: data.message, tokens: data.tokens}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
}


export async function onSubmitResetPassword (credential: ResetPasswordCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/reset-password`, {
         method: "POST",
         headers: { 'Content-Type' : 'application/json' },
         body: JSON.stringify(credential)
      })

      const data = await response.json();

      if (!response.ok) {
         return {success: false, error: data.message}
      }

      return {success: true, message: data.message}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
}


export async function onSubmitLogout (credentials: LogoutCredentials) : Promise<{
   success: boolean,
   message?: string,
   error?: string
}> {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/logout`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(credentials)
      })

      const data = await response.json();

      if (!response.ok) {
         return {success: false, error: data.message}
      }
      
      return {success: true, message: data.message}
   } catch (error) {
      return {success: false, error: (error as Error).message}
   }
}