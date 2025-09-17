import api from "@/lib/axiosInstance";
import { BookingCredentials } from "@/request_schema/PetSchema";
import axios, { AxiosError } from "axios";

type BookingStatusType = {
    status: "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export async function createBooking(data: BookingCredentials) {
   try {
      const response = await api.post('/bookings/', data);
      return { success: true, message: response.data.message, booking: response.data.booking };
   } catch (error) {
      let errorMessage = 'An error occurred while create booking. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage =
            axiosError.response?.data.message ||
            axiosError.message ||
            errorMessage
      }
      return { success: false, error: errorMessage }
   }
}


export async function getBookingById(data: { id: string }) {
   try {
      const response = await api.get(`/bookings/${data.id}`);
      return { success: true, message: response.data.message, booking: response.data.booking };
   } catch (error) {
      let errorMessage = 'An error occurred while get booking. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage =
            axiosError.response?.data.message ||
            axiosError.message ||
            errorMessage
      }
      return { success: false, error: errorMessage }
   }
}

export async function cancelBookingById(data: { id: string }) {
   try {
      const response = await api.patch(`/bookings/${data.id}/cancel`);
      return { success: true, message: response.data.message }
   } catch (error) {
      let errorMessage = 'An error occurred while cancel booking. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage =
            axiosError.response?.data.message ||
            axiosError.message ||
            errorMessage
      }
      return { success: false, error: errorMessage }
   }
}


export async function changeStatusBooking({ _id, value }: { _id: string, value: BookingStatusType }) {
   try {
      const response = await api.patch(`/bookings/${_id}/status`, value);
      return { success: true, message: response.data.message, booking: response.data.booking };
   } catch (error) {
      let errorMessage = 'An error occurred while change status booking. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage =
            axiosError.response?.data.message ||
            axiosError.message ||
            errorMessage
      }
      return { success: false, error: errorMessage }
   }
}