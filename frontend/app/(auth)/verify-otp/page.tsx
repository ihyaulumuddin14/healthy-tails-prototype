'use client'

import { useState } from 'react'
import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import useResetStore from '@/stores/useVerifyStore'
import { handleFormResponse } from '../HandleFormResponse'

const VerifyOTP = () => {
   const email = useResetStore(state => state.email)
   const [otpValidation, setOtpValidation] = useState({
      isValid: true,
      message: ''
   })

   const handleResponseVerifyOTP = async (email: string, otp: string) => {
      handleFormResponse({authType: 'verify-otp', data: { email, otp } })
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
               error={otpValidation.message}/>
      </AuthLayout>
   )
}

export default VerifyOTP