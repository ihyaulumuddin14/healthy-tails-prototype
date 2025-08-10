import { UpdatePasswordUserCredentials, UpdateUserCredentials } from '@/schema/UserSchema';
import api from './axiosInstance';
import { useAuthStore } from '@/stores/useAuthStore';
import axios, { AxiosError } from 'axios';

export async function updateUser(credential: UpdateUserCredentials) {
   try {
      const { data } = await api.put('/users/me', credential)
      
      useAuthStore.getState().setUser(data.user)
      return { success: true, message: data.message }
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return { success: false, error: errorMessage }
   }
}


export async function changeUserPassword(credential: UpdatePasswordUserCredentials) {
   try {
      const { data } = await api.put('users/me/change-password', credential)
      return {success: true,message: data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return { success: false, error: errorMessage }
   }
}

export async function postAvatar(credentials: FormData) {
   try {
      const { data } = await api.post('/users/me/avatar', credentials)
      return { success: true, message: data.message, user: data.user }
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return { success: false, error: errorMessage }      
   }
}

export async function getAllUsers() {
   try {
      const { data } = await api.get('/users/');
      return {success: true, users: data.users}
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return { success: false, error: errorMessage }
   }
}

export async function deleteUser(credentials: { _id: string }) {
   try {
      const { data } = await api.delete(`/users/${credentials._id}`)
      return {success: true, message: data.message}
   } catch (error) {
      let errorMessage = 'An error occurred while logging in. Please try again.';

      if (axios.isAxiosError(error)) {
         const axiosError = error as AxiosError<{ message: string }>;

         errorMessage = 
            axiosError.response?.data.message || 
            axiosError.message ||
            'An error occurred while logging in. Please try again.';
      }
      return { success: false, error: errorMessage }
   }
}