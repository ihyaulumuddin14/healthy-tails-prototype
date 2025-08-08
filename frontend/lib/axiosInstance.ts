import { useAuthStore } from "@/hooks/useAuthStore";
import axios from "axios";

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   withCredentials: true
})

let isRefreshing = false;
let failedQueue: {
   resolve: (token: string) => void,
   reject: (error: unknown) => void
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
   failedQueue.forEach(prom => {
      if (token) {
         prom.resolve(token)
      } else {
         prom.reject(error)
      }
   })

   failedQueue = [];
}

api.interceptors.response.use( res => res, async error => {
   const originalRequest = error.config;

   if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
         return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
         })
         .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
         })
         .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
         const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {}, {
            withCredentials: true
         });
         const newAccessToken = res.data.accessToken;
         useAuthStore.getState().setAccessToken(newAccessToken);

         const { data } = await api.get('/users/me', {
            headers: {'Authorization': `Bearer ${newAccessToken}`}
         });
         useAuthStore.getState().setUser(data.user);
         
         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
         processQueue(null, newAccessToken);
         
         return api(originalRequest);
         
      } catch (err) {

         processQueue(err, null);
         return Promise.reject(err);

      } finally {

         isRefreshing = false;
      }
   }
   return Promise.reject(error);
})

export default api;