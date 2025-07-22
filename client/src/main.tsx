import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
// import LandingPage from './features/home/pages/LandingPage'
// import ProtectedRoute from './shared/components/ProtectedRoute'
import PageNotFound from './shared/components/PageNotFound'
import { Login, Register, ResetPassword, RequestReset, VerifyOTP } from './features/auth';
import Home from './features/home'
import Service from './features/service'
// import index from './features/admin';

// root route
const routes = [
   { path: '/', element: <Navigate to="/home" replace /> },
   { path: '/home', element: <Home /> },
   { path: '/service', element: <Service /> },
   { path: '/login', element: <Login /> },
   { path: '/register', element: <Register /> },
   { path: '/request-reset', element: <RequestReset /> },
   { path: '/verify-otp', element: <VerifyOTP /> },
   { path: '/reset-password', element: <ResetPassword /> },
   { path: '*', element: <PageNotFound /> },
]

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
   // <StrictMode>
      <RouterProvider router={router} />
   // </StrictMode>,
)
