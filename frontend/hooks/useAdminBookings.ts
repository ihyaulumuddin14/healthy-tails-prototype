import api from "@/lib/axiosInstance";
import { Booking } from "@/type/type";
import useSWR from "swr";

const fetcher = async (url: string) => api.get(url).then(res => res.data);

const now = new Date().toISOString().split("T")[0];

export function useAdminBookings() {
   const { data, error, isLoading, mutate } = useSWR(
      `/bookings?date=${now}`,
      fetcher,
      {
         revalidateOnFocus: false,
         revalidateOnReconnect: true,
         revalidateOnMount: true,
      }
   )

   return {
      bookingsAdmin: data?.bookings as Booking[],
      error,
      isLoading,
      mutateBookingsAdmin: mutate
   }
}