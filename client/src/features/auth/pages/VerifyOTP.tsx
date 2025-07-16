import { useState } from 'react'
import AuthLayout from '../AuthLayout'
import useResetStore from '../../../shared/hooks/useResetStore'
import Input from '../components/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const VerifyOTP = () => {

   const email = useResetStore(state => state.emailRecovery)
   const navigate = useNavigate();
   const [otpValidation, setOtpValidation] = useState({
      isValid: true,
      message: ''
   })

   const handleSubmit = async (email: string, otp: string) => {
      toast.loading("");

      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
         })

         const data = await response.json();

         if (!response.ok) {
            toast.dismiss();
            throw new Error(data.error)
         }
         
         // success
         toast.dismiss();
         toast.success(data.message, { duration: 2000 });

         setTimeout(() => navigate('/reset-password'), 2000);
      } catch (error) {
         toast.error((error as Error).message);
      }
   }

   return (
      <AuthLayout
         title='Verify your email address'
         subtitle={`We emailed you a six-digit otp to ${email}, \nEnter the code below to confirm your email address.`}
         type='recovery'>
            <Input
               onChange={(e) => {
                  const otp = e.target.value;
                  const otpRegex = /^[0-9]+$/;
                  if (otp.length === 6 ) {
                     if (otp.match(otpRegex)) {
                        setOtpValidation({
                           isValid: true,
                           message: ''
                        })
                        handleSubmit(email!, otp)
                     } else {
                        setOtpValidation({
                           isValid: false,
                           message: 'Invalid OTP'
                        })
                     }
                  }
               }}
               label='OTP'
               type='text'
               id='otp'
               placeholder='Enter your 6 digit OTP'
               name='OTP'
               validation={otpValidation}/>
      </AuthLayout>
   )
}

export default VerifyOTP