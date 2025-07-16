import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PageNotFound from './shared/components/PageNotFound'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import ResetPassword from './features/auth/pages/ResetPassword'
// import LandingPage from './features/home/pages/LandingPage'
// import ProtectedRoute from './shared/components/ProtectedRoute'
import RequestReset from './features/auth/pages/RequestReset'
import VerifyOTP from './features/auth/pages/VerifyOTP'
import Home from './features/home'

// root route
const router = createBrowserRouter([
   {
      path: '/',
      element: <Home/>
   },
   {
      path: '/login',
      element: <Login />
   },
   {
      path: '/register',
      element: <Register />
   },
   {
      path: '/request-reset',
      element: <RequestReset />
   },
   {
      path: '/verify-otp',
      element: <VerifyOTP />
   },
   {
      path: '/reset-password',
      element: <ResetPassword />
   },
   {
      path: '*',
      element: <PageNotFound />
   }
])

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
      <RouterProvider router={router} />
   // </StrictMode>,
)
