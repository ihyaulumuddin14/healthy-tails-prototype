import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PageNotFound from './shared/components/PageNotFound'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Reset from './features/auth/pages/Reset'

// root route
const router = createBrowserRouter([
   {
      path: '/',
      element: <div>Welcome to Heaven</div>
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
      path: '/reset',
      element: <Reset />
   },
   {
      path: '*',
      element: <PageNotFound />
   }
])

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>,
)
