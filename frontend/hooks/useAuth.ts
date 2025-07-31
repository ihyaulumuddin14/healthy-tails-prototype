import useStore from '@/stores/useStore'
import { useEffect } from 'react';
import { useShallow } from "zustand/react/shallow";

export default function useAuth() {
   const { user, setUser } = useStore(
      useShallow(state => ({
         user: state.user,
         setUser: state.setUser
      }))
   );

   useEffect(() => {
      (async function getUser() {
         try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/user`, {
               method: "GET",
               credentials: "include",
            })

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            
            setUser(data);
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         } catch (error) {
            setUser(null);
         }
      })();
   }, [setUser]);

   return user;
}