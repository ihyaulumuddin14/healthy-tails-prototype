import { useEffect, useState } from "react";
import useStore from "./useStore";
import toast from "react-hot-toast";


const useAuth = () => {
   const setUser = useStore((state) => state.setUser);
   const user = useStore((state) => state.user);
   const [loading, setLoading] = useState(true);

   useEffect(() => {

      const getUser = async () => {
         try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
               method: "GET",
               credentials: "include",
            })

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            
            setUser(data);
         } catch (error) {
            toast.error((error as Error).message);
         } finally {
            setLoading(false);
         }
      }

      getUser();
   }, [setUser]);

   return { user, loading };
}


export default useAuth;