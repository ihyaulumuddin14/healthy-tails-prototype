import Link from 'next/link'
import { handleFormResponse } from '../HandleFormResponse';

const AuthLinks = ({ type, email = '' }: { type: string, email?: string }) => {

   const handleResponseResendOTP = async() => {
      await handleFormResponse({ authType: 'resend-otp', data: { email } });
   }

   return (
      <p className='text-sm opacity-70 text-center text-[var(--color-foreground)]'>
         {type === "register" ? ("Already have an account? ") : (type === "login") ? ("Not a Member? ") : ("Can't get an OTP? ")}
         {(type !== "recovery") ? (
            <Link href={type === "register" ? '/login' : (type === "login") ? '/register' : '/recovery'} className='font-semibold cursor-pointer text-[var(--color-tertiary)] brightness-90 hover:brightness-100 hover:scale-95 ease-in-out duration-200'>
               {type === "register" ? ("Login") : (type === "login") ? ("Register") : ("Resend")}
            </Link>
         ) : (
            <button
               role='button'
               onClick={handleResponseResendOTP}
               className='font-semibold cursor-pointer text-[var(--color-tertiary)] brightness-90 hover:brightness-100 hover:scale-95 ease-in-out duration-200'>
               Resend
            </button>
         )}
      </p>
   )
}

export default AuthLinks;