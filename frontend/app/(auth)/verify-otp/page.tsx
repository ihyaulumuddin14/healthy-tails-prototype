'use client'

import { useEffect, useState } from 'react'
import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import { handleAuthResponse } from '../../../helpers/handleAuthResponse'
import { useRouter } from 'next/navigation'

const VerifyOTP = () => {
   const [email, setEmail] = useState<string>('')
   const router = useRouter()
   const [otpValidation, setOtpValidation] = useState({
      isValid: true,
      message: ''
   })

   const handleResponseVerifyOTP = async (email: string, otp: string) => {
      handleAuthResponse({ authType: 'verify-otp', data: { email, otp }, router })
   }

   useEffect(() => {
      const { email } = JSON.parse(sessionStorage.getItem('email') as string);
      if (email) {
         setEmail(email)
      }
   }, [])

   return (
      <AuthLayout
         title='Verify your email address'
         subtitle={`We emailed a six-digit otp to ${email}, \nEnter the code below to confirm`}
         type='recovery'>
         <Input
            onChange={(e) => {
               const otp = e.target.value;
               const otpRegex = /^[0-9]+$/;
               if (otp.length === 6) {
                  if (otp.match(otpRegex)) {
                     setOtpValidation({
                        isValid: true,
                        message: ''
                     })
                     handleResponseVerifyOTP(email!, otp)
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
            error={otpValidation.message} />
      </AuthLayout>
   )
}

export default VerifyOTP