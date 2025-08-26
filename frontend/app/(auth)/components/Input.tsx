'use client'

import { forwardRef, useState } from 'react';
import { Link } from "@/providers/nprogress/Link";
import Countdown from './Countdown';

type InputProps = {
   label: string;
   type: string;
   id: string;
   placeholder: string;
   name: string;
   forgotPassword?: boolean;
   className?: string;
   error?: string;
   optional?: boolean;
   disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({
   label,
   type,
   id,
   placeholder,
   name,
   forgotPassword = false,
   error,
   optional = false,
   disabled = false,
   ...props
}, ref) => {
   const [isPasswordReveal, setIsPasswordReveal] = useState(false);

   return (
      <div className='flex flex-col gap-1 mb-1 w-full relative'>
         <header className='w-full flex justify-between items-end font-bold'>
            <label htmlFor={id}>
               {label} {!optional ? <span className='text-red-600'>*</span> : <span className="font-light">(optional)</span>}
            </label>

            {id === 'otp' && (
               <Countdown />
            )}
         </header>

         <main className='w-full relative'>
            <input
               ref={ref}
               type={isPasswordReveal ? 'text' : type}
               name={name}
               id={id}
               disabled={disabled}
               placeholder={placeholder}
               className={`w-full border rounded-md py-2 px-4 ${type === 'password' ? 'pr-12' : ''} outline-0 ${error ? 'border-pink-500' : 'border-border'} backdrop-blur-3xl focus:shadow-md focus:shadow-green-200/50 shadow-sm shadow-border ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
               {...props}
            />

            {type === 'password' && (
               <button
                  type="button"
                  onClick={() => setIsPasswordReveal(!isPasswordReveal)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
               >
                  {isPasswordReveal ? (
                     <svg className="w-6 h-6 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                        <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                     </svg>
                  ) : (
                     <svg className="w-6 h-6 text-[var(--color-foreground)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                     </svg>
                  )}
               </button>
            )}
         </main>

         <footer className='w-full'>
            <p className={`text-pink-600 text-xs ml-2 ${error ? 'visible' : 'invisible'}`}>
               {error ?? 'placeholder'}
            </p>

            <div className='w-full flex justify-end'>
               {type === 'password' && forgotPassword && (
                  <Link href="/forgot-password" className='self-end text-[var(--color-tertiary)] text-sm ease-in-out duration-100 cursor-pointer hover:scale-99'>Forgot Password?</Link>
               )}
            </div>
         </footer>
      </div>
   );
});

Input.displayName = 'Input'

export default Input;
