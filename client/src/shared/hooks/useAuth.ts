import { useEffect } from "react";
import useStore from "./useStore";
import { useShallow } from "zustand/react/shallow";


const useAuth = () => {
   const {
      user,
      setUser,
      isLoading,
      setIsLoading
   } = useStore(useShallow(state => ({
      user: state.user,
      setUser: state.setUser,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading
   })))

   useEffect(() => {

      const getUser = async () => {
         try {
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
               method: "GET",
               credentials: "include",
            })

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            
            setUser(data);
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         } catch (error) {
            setUser(null);
         } finally {
            setIsLoading(false);
         }
      }

      getUser();
   }, [setUser, setIsLoading]);

   return { user, isLoading };
}


export default useAuth;