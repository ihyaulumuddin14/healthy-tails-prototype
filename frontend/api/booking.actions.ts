import api from "@/lib/axiosInstance";
import { BookingCredentials } from "@/schema/PetSchema";
import axios, { AxiosError } from "axios";
import { bookings } from '@/app/constant';

export async function createBooking(data: BookingCredentials) {
   try {
      const response = await api.post('/bookings/', data);
      return { success: true, message: response.data.message, booking: bookings[0] }
   } catch (error) {
      let errorMessage = 'An error occurred while create booking. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage =
            axiosError.response?.data.message ||
            axiosError.message ||
            errorMessage
      }
      return { success: false, error: errorMessage, booking: bookings[0] }
   }
}
