import api from "@/lib/axiosInstance";
import { EditPetCredentials, CreatePetCredentials } from "@/schema/PetSchema";
import axios, { AxiosError } from "axios";

export async function getPetById(credentials: { id: string }) {
   try {
      const { data } = await api.get(`/pets/${credentials.id}`);
      return { success: true, pet: data.pet }
   } catch (error) {
      let errorMessage = 'An error occurred while fething pet. Please try again.';

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

export async function createPet(credentials: CreatePetCredentials) {
   try {
      const { data } = await api.post('/pets/', credentials);
      return { success: true, message: data.message, pet: data.pet };
   } catch (error) {
      let errorMessage = 'An error occurred while create pet. Please try again.';

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

export async function editPet(id: string, credentials: EditPetCredentials) {
   try {
      const { data } = await api.patch(`/pets/${id}`, credentials);
      return { success: true, message: data.message, pet: data.pet };
   } catch (error) {
      let errorMessage = 'An error occurred while edit pet. Please try again.';

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

export async function deletePet(credentials: { _id: string }) {
   try {
      const { data } = await api.delete(`/pets/${credentials._id}`);
      return { success: true, message: data.message || 'Pet deleted' };
   } catch (error) {
      let errorMessage = 'An error occurred while delete pet. Please try again.';

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

export async function getHistoryOfPet(data: { id: string }) {
   try {
      const response = await api.get(`/pets/${data.id}/history`);
      return { success: true, histories: response.data.history };
   } catch (error) {
      let errorMessage = 'An error occurred while get history of pet. Please try again.';

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