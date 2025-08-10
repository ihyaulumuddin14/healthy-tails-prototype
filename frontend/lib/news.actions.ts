import { NewsCredentials } from './../schema/NewsSchema';
import axios, { AxiosError } from "axios";
import api from './axiosInstance';

function newAbortSignal(timeoutMs: number) {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
}

export async function getAllNews() {
   try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
         signal: newAbortSignal(5000),
      });
      return data.news;
   } catch {
      return []
   }
}

export async function getNewsById(credentials: { _id: string }) {
   try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/${credentials._id}`, {
         signal: newAbortSignal(5000),
      });
      return { success: true, message: data.message, news: data.news };
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

export async function createNews(credentials: NewsCredentials) {
   try {
      const { data } = await api.post('/news/', credentials);
      return { success: true, message: data.message };
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

export async function editNews(credentials: { _id: string, news: NewsCredentials }) {
   try {
      const { data } = await api.put(`/news/${credentials._id}`, credentials.news);
      return { success: true, message: data.message };
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

export async function deleteNews(credentials: { _id: string }) {
   try {
      const { data } = await api.delete(`/news/${credentials._id}`);
      return { success: true, message: data.message };
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