import AuthLayout from '../AuthLayout'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { useFormik } from 'formik'
import type { LoginCredentials } from '../models/types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const Login = () => {

   const navigate = useNavigate();
   
   const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
   }

   const handleValidationErrors = (errors: {email?: string, password?: string}) => {
      if (errors.email) {
         toast.error(errors.email);
      } else if (errors.password) {
         toast.error(errors.password);
      }
   }

   const handleSubmit = async (credential: LoginCredentials) => {
      try {
         const responseLogin = await fetch(`${import.meta.env.VITE_API_URL}/login`,
            {
               method: 'POST',
               credentials: 'include',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(credential)
            }
         );
                           
         const dataLogin = await responseLogin.json();

         if (!responseLogin.ok) {
            throw new Error(dataLogin.error);
         }

         toast.loading(dataLogin.message, {
            duration: 3000
         })

         setTimeout(() => navigate('/'), 3000);
      } catch (error) {
         toast.error((error as Error).message);
      }
   }

   const formik = useFormik({
      initialValues: {
         email: '',
         password: ''
      },
      onSubmit: handleSubmit,
      validateOnChange: false,
      validateOnBlur: false,
      validate: (values) => {
         const errors: {
            email?: string,
            password?: string
         } = {};
         
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
            title='Login'
            subtitle='Welcome back, Pawrents!'
            type='login'>
               <Input
                  onChange={handleForm}
                  label='Email'
                  type='email'
                  id='email'
                  placeholder='Enter your phone email'
                  name='email'/>
               <Input
                  onChange={handleForm}
                  label='Password'
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  name='password'
                  forgotPassword={true} />
               <SubmitButton label='Login'/>
         </AuthLayout>
      </form>
   )
}

export default Login