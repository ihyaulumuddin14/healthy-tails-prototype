import { toast } from "react-hot-toast";


export const resendOTPApi = async (email: string) => {
   try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request-reset`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email })
      })

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.error)
      }

      toast.success(data.message);
   } catch (error) {
      toast.error((error as Error).message);
   }
}