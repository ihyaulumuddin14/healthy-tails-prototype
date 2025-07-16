import { useState } from 'react'
import { Link } from 'react-router-dom'

type InputProps = {
   onChange?: React.ChangeEventHandler<HTMLInputElement>,
   label: string,
   type: string,
   id: string,
   placeholder: string,
   name: string,
   forgotPassword?: boolean,
   validation?: {
      isValid: boolean,
      message: string
   }
}


const Input = ({onChange = () => {}, label, type, id, placeholder, name, forgotPassword = false, validation = {isValid : true, message: ""}}: InputProps) => {
   const [isPasswordReveal, setIsPasswordReveal] = useState(false)

   return (
      <div className='flex flex-col gap-1 mb-3 w-full'>
         <label htmlFor="emailPhone">{label} <span className='text-red-600'>*</span></label>

         <div className='w-full relative'>
            <input
               maxLength={name === 'OTP' ? 6 : 100}
               onChange={onChange}
               type={isPasswordReveal ? "text" : type}
               name={name}
               id={id}
               placeholder={placeholder}
               className={`w-full border rounded-md py-3 px-4 outline-0 ${validation.isValid ? "border-slate-700" : "border-pink-500 shadow-xs shadow-pink-500"} backdrop-blur-3xl`}
               />
            
            {type === 'password' && (
               <button
               type='button'
               onClick={() => setIsPasswordReveal(!isPasswordReveal)}
               className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                     { isPasswordReveal ? 
                        ( <svg className="w-6 h-6 text-[var(--text-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                           </svg>
                        ) : (
                           <svg className="w-6 h-6 text-[var(--text-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                           </svg>
                        )
                     }
               </button>
            )}
         </div>
         <p className={`text-pink-600 text-sm mt-1 ml-2 ${validation.isValid ? "invisible" : "visible"}`}>{validation.message}</p>

         {type === 'password' && forgotPassword && (
            <Link to="/request-reset" className='self-end text-[var(--tertiary-color)] text-sm ease-in-out duration-100 cursor-pointer hover:scale-99'>Forgot password</Link>
         )}
      </div>
   )
}

export default Input;