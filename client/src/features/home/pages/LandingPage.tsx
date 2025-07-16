import useStore from '../../../shared/hooks/useStore'
import { Toaster } from 'react-hot-toast'
import { type User } from '../../auth/models/types'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
   const user: User | null = useStore((state) => state.user);
   const setUser = useStore((state) => state.setUser);
   const navigate = useNavigate();

   const handleLogout = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`,
         {
            method: 'POST',
            credentials: 'include'
         }
      );

      if (res.ok) {
         setUser(null);
         navigate('/login');
      }
   }

   return (
      <div>
         <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }}></Toaster>

         <h1>Home</h1>
         <p>{user?.fullName}</p>
         <p>{user?.email}</p>
         <p>{user?.role}</p>

         <button onClick={handleLogout} className='py-2 px-4 bg-[var(--tertiary-color)] rounded-lg'>Logout</button>
      </div>
   )
}

export default LandingPage