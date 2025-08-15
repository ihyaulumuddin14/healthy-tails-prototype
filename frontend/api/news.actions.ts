import { NewsCredentials } from '../schema/NewsSchema';
import axios, { AxiosError } from "axios";
import api from '../lib/axiosInstance';

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

export async function getNewsById(credentials: { id: string }) {
   try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/${credentials.id}`, {
         signal: newAbortSignal(5000),
      });
      return { success: true, message: data.message, news: data.news };
   } catch (error) {
      let errorMessage = 'An error occurred while get news. Please try again.';

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

export async function createNews(credentials: NewsCredentials) {
   try {
      const { data } = await api.post('/news/', credentials);
      return { success: true, message: data.message };
   } catch (error) {
      let errorMessage = 'An error occurred while create news. Please try again.';

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

export async function editNews(credentials: { id: string, news: NewsCredentials }) {
   try {
      const { data } = await api.patch(`/news/${credentials.id}`, credentials.news);
      return { success: true, message: data.message };
   } catch (error) {
      let errorMessage = 'An error occurred while edit news. Please try again.';

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

export async function deleteNews(credentials: { id: string }) {
   try {
      const { data } = await api.delete(`/news/${credentials.id}`);
      return { success: true, message: data.message };
   } catch (error) {
      let errorMessage = 'An error occurred while delete news. Please try again.';

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