import { showErrorToast } from "@/helpers/toastHelper";
import api from "@/lib/axiosInstance";
import { Booking } from "@/type/type";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => 
   api.get(url)
      .then(res => res.data)
      .catch(error => {
         let errorMessage = 'An error occurred while fetching bookings data. Please try again.'

         if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            errorMessage = axiosError.response?.data.message || axiosError.message || errorMessage
         }

         throw new Error(errorMessage);
      })

const formatDateToYYYYMMDD = (date: Date): string => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
};

export function useAdminBookings(date?: Date | null) {
   const dateParam = date ? formatDateToYYYYMMDD(date) : formatDateToYYYYMMDD(new Date());
   
   const { data, error, isLoading, mutate } = useSWR(
      `/bookings?date=${dateParam}`,
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
         onError: (err) => {
            showErrorToast(err.message)
         }
      }
   )

   return {
      bookingsAdmin: data?.bookings as Booking[],
      error,
      isLoading,
      mutateBookingsAdmin: mutate
   }
}