import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useResetStore from '../../../shared/hooks/useResetStore'

const ResetPassword = () => {

   const navigate = useNavigate();
   const email = useResetStore(state => state.emailRecovery);
   const clearEmail = useResetStore(state => state.clearEmailRecovery);
   const [isPasswordValid, setIsPasswordValid] = useState({
      lengthValid: false,
      upperCaseValid: false,
      lowerCaseValid: false,
      specialCharValid: false,
      numberValid: false
   });
   const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
      isValid: true,
      message: ""
   });

   const handleSubmit = async (values: { newPassword: string; confirmPassword: string }) => {
      toast.loading('');
      try {
         const { newPassword } = values;
         console.log(email)
         const response = await fetch(`${import.meta.env.VITE_API_URL}/reset-password`, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email, newPassword })
         })

         const data = await response.json();

         if (!response.ok) {
            toast.dismiss();
            clearEmail();
            throw new Error(data.error);
         }

         toast.dismiss();
         
         // clear front end
         clearEmail();
         toast.success(data.message, {
            duration: 2000
         });

         setTimeout(() => {
            toast.dismiss();
            navigate('/login')
         }, 2000);
      } catch (error) {
         toast.error((error as Error).message);
      }
   }

   const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
   }

   const handleValidationErrors = (errors: { newPassword?: string, confirmPassword?: string } ) => {
      if (errors.newPassword) {
         toast.error(errors.newPassword);
      } else {
         setConfirmPasswordValidation({
            isValid: false,
            message: errors.confirmPassword!
         })
      }
   }

   const formik = useFormik({
      initialValues: {
         newPassword: '',
         confirmPassword: ''
      },
      onSubmit: handleSubmit,
      validateOnChange: false,
      validateOnBlur: false,
      validate: (values) => {
         const errors: { newPassword?: string, confirmPassword?: string } = {};

         if (!values.newPassword) {
            errors.newPassword = 'Password is required';
         } else {
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
            if (!passwordRegex.test(values.newPassword)) {
               errors.newPassword = 'Invalid password combination';
            }
         }

         if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = 'Password does not match';
         }

         if (Object.keys(errors).length > 0) {
            handleValidationErrors(errors);
         }

         return errors;
      }
   })


   return (
      <form action="" onSubmit={formik.handleSubmit}>
         <AuthLayout title='Reset Password' subtitle='Please reset your password' type='reset'>
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
               label='New Password'
               type='password'
               id='newPassword'
               placeholder='Enter your new password'
               name='newPassword' />
            <Input
               onChange={handleForm}
               label='Confirm Password'
               type='password'
               id='confirmPassword'
               placeholder='Enter your confirm password'
               name='confirmPassword'
               validation={confirmPasswordValidation}/>
            <div className='flex flex-col gap-1 my-3 w-full text-xs'>
               <p className='text-sm'>Password must contain:</p>
               <p className={`opacity-80 ${isPasswordValid.lengthValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.lengthValid ? '✓' : '-'} At least 8 characters</p>
               <p className={`opacity-80 ${isPasswordValid.upperCaseValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.upperCaseValid ? '✓' : '-'} One upper case letter</p>
               <p className={`opacity-80 ${isPasswordValid.lowerCaseValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.lowerCaseValid ? '✓' : '-'} One lower case letter</p>
               <p className={`opacity-80 ${isPasswordValid.specialCharValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.specialCharValid ? '✓' : '-'} One special character or space</p>
               <p className={`opacity-80 ${isPasswordValid.numberValid ? "text-[var(--tertiary-color)]" : "text-[var(--text)]"}`}>{isPasswordValid.numberValid ? '✓' : '-'} One number</p>
            </div>
            <SubmitButton label='Reset Password' />
         </AuthLayout>
      </form>
   )
}

export default ResetPassword;