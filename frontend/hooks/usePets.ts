import { showErrorToast } from "@/helpers/toastHelper";
import api from "@/lib/axiosInstance";
import { Pet } from "@/type/type";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

const fetcher = async (url: string) =>
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

export default function usePets() {
   const { data, error, isLoading, mutate } = useSWR(
      '/pets/',
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
         dedupingInterval: 1000 * 60 * 5,
         shouldRetryOnError: false,
         onError: (err) => {
            showErrorToast(err.message);
         }
      }
   )

   return {
      pets: data?.pets as Pet[],
      error,
      isLoading,
      mutatePets: mutate
   }
}