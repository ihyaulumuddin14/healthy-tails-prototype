import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const Register = () => {
   return (
      <AuthLayout title='Sign up' subtitle='Please sign up before use the app' type='register'>
         <Input label='Fullname' type='text' id='fullname' placeholder='Enter your fullname' name='fullname'/>
         <Input label='Email or phone number' type='text' id='emailPhone' placeholder='Enter your phone email or your phone number' name='emailPhone'/>
         <Input label='Password' type='password' id='password' placeholder='Enter your password' name='password'></Input>
         <SubmitButton label='Sign up' />
      </AuthLayout>
   )
}

export default Register;