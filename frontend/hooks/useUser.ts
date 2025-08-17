import api from "@/lib/axiosInstance";
import useGlobalLoading from "@/stores/loadingStore";
import { userStore } from "@/stores/userStore";
import { User } from "@/type/type";
import { useEffect, useState } from "react";

export default function useUser() {
   const user = userStore((state) => state.user);
   const setUser = userStore((state) => state.setUser);
   const [isLoading, setIsLoading] = useState(user ? false : true);
   const [isError, setIsError] = useState(false);
   const setFetching = useGlobalLoading((state) => state.setFetching);

   useEffect(() => {
      setFetching(isLoading)  
   }, [isLoading, setFetching])

   useEffect(() => {
      if (user) return;

      const fetchUser = async () => {
         try {
            const { data } = await api.get('/users/me', {
               headers: {

               }
            });
            setUser(data.user);
         } catch {
            setIsError(true);
         } finally {
            setIsLoading(false);
         }
      }

      fetchUser();
   }, [])

   return { 
      user: user as User ?? null,
      error: isError,
      isLoading,
   }
}