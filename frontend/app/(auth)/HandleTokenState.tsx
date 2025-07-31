'use client'

import { TokenResponse } from "./schemas/AuthSchema"

// Utility functions - tanpa hooks
export function setTokenToStorage(tokens: TokenResponse) {
   if (typeof window !== 'undefined') {
      localStorage.setItem('token', JSON.stringify(tokens))
   }
}

export function removeTokenFromStorage() {
   if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
   }
}

export function getTokenFromStorage(): TokenResponse | null {
   if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      return storedToken ? JSON.parse(storedToken) : null;
   }
   return null;
}