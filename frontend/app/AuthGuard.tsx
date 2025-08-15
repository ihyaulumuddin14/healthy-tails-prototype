'use client'

import { showErrorToast } from "@/helpers/toastHelper";
import useUser from "@/hooks/useUser";

type Props = React.PropsWithChildren<{
   fallback?: React.ReactNode
   skeleton: React.ReactNode
   useToast?: boolean,
   role: 'USER' | 'ADMIN' | 'BOTH'
}>

export default function AuthGuard({ fallback, skeleton, children, useToast = false, role }: Props) {
   const { user, error, isLoading } = useUser();

   if (isLoading) {
      return (
         <>
            {skeleton}
         </>
      )
   }

   if (error) {
      if (useToast) showErrorToast(error.message);
      return (
         <>
            {fallback}
         </>
      )
   }

   return (
      <>
         {user.role === role && children}
      </>
   )
}
