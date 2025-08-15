import { showErrorToast } from "@/helpers/toastHelper";
import api from "@/lib/axiosInstance";
import { Booking } from "@/type/type";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function useBookings() {
   const { data, error, isLoading, mutate } = useSWR(
      '/bookings/',
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
         refreshInterval: 1000 * 60 * 1,
         dedupingInterval: 1000 * 60 * 1,
         shouldRetryOnError: false,
         onError: (err) => {
            showErrorToast(err.message);
         }
      }
   )

   return {
      bookings: data?.bookings as Booking[],
      error,
      isLoading,
      mutateBookings: mutate
   }
}