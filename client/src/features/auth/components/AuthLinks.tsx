import { Link } from 'react-router-dom'
import { resendOTPApi } from '../../../shared/api/auth';

const AuthLinks = ({ type, email = '' }: { type: string, email?: string }) => {
   return (
      <p className='text-sm opacity-70 text-center'>
         {type === "register" ? ("Already have an account? ") : (type === "login") ? ("Not a Member? ") : ("Can't get an OTP? ")}
         {(type !== "recovery") ? (
            <Link to={type === "register" ? '/login' : (type === "login") ? '/register' : '/recovery'} className='font-semibold cursor-pointer text-[var(--tertiary-color)] brightness-90 hover:brightness-100 hover:scale-95 ease-in-out duration-200'>
               {type === "register" ? ("Login") : (type === "login") ? ("Register") : ("Resend")}
            </Link>
         ) : (
            <button
               role='button'
               onClick={() => {resendOTPApi(email)}}
               className='font-semibold cursor-pointer text-[var(--tertiary-color)] brightness-90 hover:brightness-100 hover:scale-95 ease-in-out duration-200'>
               Resend
            </button>
         )}
      </p>
   )
}

export default AuthLinks;