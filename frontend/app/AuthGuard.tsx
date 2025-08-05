'use client'

import { useAuthStore } from "@/hooks/useAuthStore";
import api from "@/lib/axiosInstance";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";


type Props = React.PropsWithChildren<{
   fallback?: React.ReactNode
   skeleton: React.ReactNode
   useToast?: boolean
}>

export default function AuthGuard({ fallback, skeleton, children, useToast = false }: Props) {
   const [isLoading, setIsLoading] = useState(true);
   const setUser = useAuthStore((state) => state.setUser);
   const accessToken = useAuthStore((state) => state.accessToken);

   useEffect(() => {
      const getUserData = async () => {
         try {
            const response = await api.get('/users/me');
            setUser(response.data.user);
         } catch (error) {
            let errorMessage = 'An error occurred while fetching user data. Please try again.'
   
            if (axios.isAxiosError(error)) {
               const axiosError = error as AxiosError<{ message: string }>;
               errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
            }

            if (useToast) toast.error(errorMessage)
         } finally {
            setIsLoading(false);
         }
      }

      getUserData();
   }, []);

   if (isLoading) {
      return (
         <>
            {skeleton}
         </>
      )
   }

   return (
      <>
         {accessToken ? children : fallback}
      </>
   )
}
