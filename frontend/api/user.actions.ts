import { UpdatePasswordUserCredentials, UpdateUserCredentials } from '@/request_schema/UserSchema';
import api from '../lib/axiosInstance';
import axios, { AxiosError } from 'axios';

export async function updateUser(credential: UpdateUserCredentials) {
   try {
      const { data } = await api.put('/users/me', credential)

      return { success: true, user: data.user, message: data.message }
   } catch (error) {
      let errorMessage = 'An error occurred while update data. Please try again.';

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


export async function changeUserPassword(credential: UpdatePasswordUserCredentials) {
   try {
      const { data } = await api.put('/users/me/change-password', credential)

      return { success: true, message: data.message }
   } catch (error) {
      let errorMessage = 'An error occurred while change password. Please try again.';

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

export async function postAvatar(credentials: FormData) {
   try {
      const { data } = await api.post('/users/me/avatar', credentials, {
         headers: {
            "Content-Type": "multipart/form-data",
         }
      })
      return { success: true, message: data.message, user: data.user }
   } catch (error) {
      let errorMessage = 'An error occurred while change avatar. Please try again.';

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

export async function deleteMe() {
   try {
      const { data } = await api.delete('/users/me')
      return { success: true, message: data.message || 'Account deleted' }
   } catch (error) {
      let errorMessage = 'An error occurred while delete account. Please try again.';

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

export async function getAllUsers() {
   try {
      const { data } = await api.get('/users/');
      return { success: true, users: data.users }
   } catch (error) {
      let errorMessage = 'An error occurred while fetch all user. Please try again.';

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

export async function deleteUserById(credentials: { _id: string }) {
   try {
      await api.delete(`/users/${credentials._id}`)
      return { success: true, message: "User deleted" }
   } catch (error) {
      let errorMessage = 'An error occurred while delete user. Please try again.';

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