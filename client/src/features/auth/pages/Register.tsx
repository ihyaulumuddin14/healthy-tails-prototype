import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { useState } from 'react'
import { useFormik } from 'formik'
import type { RegisterData } from '../models/types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {

   const navigate = useNavigate();

   const [isPasswordValid, setIsPasswordValid] = useState({
      lengthValid: false,
      upperCaseValid: false,
      lowerCaseValid: false,
      specialCharValid: false,
      numberValid: false
   });

   const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
   }

   const handleValidationErrors = (errors: {fullName?: string, email?: string, password?: string}) => {
      if (errors.fullName) {
         toast.error(errors.fullName);
      } else if (errors.email) {
         toast.error(errors.email);
      } else if (errors.password) {
         toast.error(errors.password);
      }
   }

   const handleSubmit = async (data: RegisterData) => {
      try {
         const responseRegister = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
         })
   
         const dataRegister = await responseRegister.json();
         if (!responseRegister.ok) throw new Error(dataRegister.error)

         toast.success(dataRegister.message, {
            duration: 2000
         });

         setTimeout(() => {
            toast.dismiss();
            navigate('/login')
         }, 2000)
      } catch (error) {
         toast.error((error as Error).message)
      }
   }


   const formik = useFormik({
      initialValues: {
         fullName: '',
         email: '',
         password: ''
      },
      onSubmit: handleSubmit,
      validateOnChange: false,
      validateOnBlur: false,
      validate: (values) => {
         const errors: {
            fullName?: string,
            email?: string,
            password?: string
         } = {};

         if (!values.fullName) {
            errors.fullName = 'Fullname is required';
         }
         if (!values.email) {
            errors.email = 'Email is required';
         } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(values.email)) {
               errors.email = 'Invalid email';
            }
         }
         if (!values.password) {
            errors.password = 'Password is required';
         } else {
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
            if (!passwordRegex.test(values.password)) {
               errors.password = 'Invalid password combination';
            }
         }

         if (Object.keys(errors).length > 0) {
            handleValidationErrors(errors);
         }

         return errors;
      }
   })

   return (
      <form action="" onSubmit={formik.handleSubmit}>
         <AuthLayout
            title='Register'
            subtitle='Please sign up before use the app'
            type='register'>
               <Input
                  onChange={handleForm}
                  label='Fullname'
                  type='text'
                  id='fullname'
                  placeholder='Enter your fullname'
                  name='fullName'/>
               <Input
                  onChange={handleForm}
                  label='Email'
                  type='email'
                  id='email'
                  placeholder='Enter your phone email'
                  name='email'/>
               <Input
                  onChange={(event) => {
                     const password = event.target.value;
                     setIsPasswordValid({
                        lengthValid: password.length >= 8,
                        upperCaseValid: /[A-Z]/.test(password),
                        lowerCaseValid: /[a-z]/.test(password),
                        specialCharValid: /[^A-Za-z0-9]/.test(password),
                        numberValid: /[0-9]/.test(password)
                     });
                     handleForm(event);
                  }}
                  label='Password'
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  name='password'/>
               <div className='flex flex-col gap-1 my-3 w-full text-xs'>
                  <p className='text-sm'>Password must contain:</p>
                  <p className={`opacity-80 ${isPasswordValid.lengthValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.lengthValid ? '✓' : '-'} At least 8 characters</p>
                  <p className={`opacity-80 ${isPasswordValid.upperCaseValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.upperCaseValid ? '✓' : '-'} One upper case letter</p>
                  <p className={`opacity-80 ${isPasswordValid.lowerCaseValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.lowerCaseValid ? '✓' : '-'} One lower case letter</p>
                  <p className={`opacity-80 ${isPasswordValid.specialCharValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.specialCharValid ? '✓' : '-'} One special character or space</p>
                  <p className={`opacity-80 ${isPasswordValid.numberValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.numberValid ? '✓' : '-'} One number</p>
               </div>
               <SubmitButton label='Register' />
         </AuthLayout>
      </form>
   )
}

export default Register;