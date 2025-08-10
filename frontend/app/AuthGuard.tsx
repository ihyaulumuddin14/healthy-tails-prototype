'use client'

import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axiosInstance";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { User } from "@/type/type";


type Props = React.PropsWithChildren<{
   fallback?: React.ReactNode
   skeleton: React.ReactNode
   useToast?: boolean,
   role: 'USER' | 'ADMIN' | 'BOTH'
}>

export default function AuthGuard({ fallback, skeleton, children, useToast = false, role }: Props) {
   const [isLoading, setIsLoading] = useState(true);
   const setUser = useAuthStore((state) => state.setUser);
   const accessToken = useAuthStore((state) => state.accessToken);
   const [isValidRole, setIsValidRole] = useState(false);

   useEffect(() => {
      const getUserData = async () => {
         try {
            const { data } = await api.get('/users/me');
            const user = data.user as User

            setUser(user)
            setIsValidRole(role === data.user?.role || role === 'BOTH');
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
         {accessToken && isValidRole ? children : fallback}
      </>
   )
}
