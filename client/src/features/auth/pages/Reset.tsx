import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const Reset = () => {
   return (
      <AuthLayout title='Reset Password' subtitle='Please reset your password' type='reset'>
         <Input label='New Password' type='password' id='newPassword' placeholder='Enter your new password' name='newPassword' />
         <Input label='Confirm Password' type='password' id='confirmPassword' placeholder='Enter your confirm password' name='confirmPassword' />
         <SubmitButton label='Reset Password' />
      </AuthLayout>
   )
}

export default Reset;