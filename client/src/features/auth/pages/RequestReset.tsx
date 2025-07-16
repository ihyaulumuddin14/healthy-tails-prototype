import AuthLayout from "../AuthLayout"
import Input from "../components/Input"
import SubmitButton from "../components/SubmitButton"
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import useResetStore from "../../../shared/hooks/useResetStore"

type credentialType = {
   email: string
}

const RequestReset = () => {

   const navigate = useNavigate();
   const setEmailRecovery = useResetStore(state => state.setEmailRecovery);
   const [emailValidation, setEmailValidation] = useState({
      isValid: true,
      message: ''
   });

   const handleSubmit = async (credential: credentialType) => {
      toast.loading('Sending OTP');

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/request-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credential)
         })
         
         const data = await response.json();

         // error
         if (!response.ok) {
            toast.dismiss();
            throw new Error(data.error);
         }

         // success
         toast.dismiss();
         toast.success(data.message, { duration: 2000 })
         setEmailRecovery(credential.email)

         setTimeout(() => navigate('/verify-otp'), 2000)
      } catch (error) {
         toast.error((error as Error).message)
      }
   }

   const formik = useFormik({
      initialValues: { email: '' },
      onSubmit: handleSubmit,
      validateOnChange: true,
      validateOnBlur: true,
      validate: (values) => {
         const errors: { email?: string } = {};
         
         if (!values.email) {
            errors.email = 'Email is required';
         } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(values.email)) {
               errors.email = 'Invalid email';
            }
         }
         
         if (Object.keys(errors).length > 0) {
            setEmailValidation({
               isValid: false,
               message: errors.email!
            });
         } else {
            setEmailValidation({
               isValid: true,
               message: ""
            });
         }
         
         return errors;
      }      
   })

   const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
   }

   return (
      <form action="" onSubmit={formik.handleSubmit}>
         <AuthLayout
            title="Confirmation Email"
            subtitle="Please input a registered email to receive the OTP"
            type="email-reset">
               <Input
                  onChange={handleForm}
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Enter your phone email"
                  name="email"
                  validation={emailValidation}/>
               <SubmitButton label="Get an OTP"/>
         </AuthLayout>
      </form>
   )
}

export default RequestReset;