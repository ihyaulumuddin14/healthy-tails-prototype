import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const Login = () => {
   return (
      <AuthLayout title='Login' subtitle='Welcome back' type='login'>
         <Input label='Email or phone number' type='text' id='emailPhone' placeholder='Enter your phone email or your phone number' name='emailPhone'/>
         <Input label='Password' type='password' id='password' placeholder='Enter your password' name='password' forgotPassword={true}></Input>
         <SubmitButton label='Login'/>
      </AuthLayout>
   )
}

export default Login