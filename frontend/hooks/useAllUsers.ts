import useSWR from "swr";
import api from "@/lib/axiosInstance";
import { User } from "@/type/type";
import { showErrorToast } from "@/helpers/toastHelper";
import axios, { AxiosError } from "axios";

const fetcher = (url: string) =>
   api.get(url)
      .then(res => res.data)
      .catch(error => {
         let errorMessage = 'An error occurred while fetching user data. Please try again.'

         if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
         }

         throw new Error(errorMessage);
      })

export const useAllUsers = () => {
   const { data, error, isLoading, mutate } = useSWR(
      '/users/',
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
         shouldRetryOnError: false,
         onError: (err) => {
            showErrorToast(err.message);
         }
      }
   )

   return {
      users: data?.users.filter((user: User) => user.role !== 'ADMIN') as User[],
      error,
      isLoading,
      mutateUsers: mutate
   }
}