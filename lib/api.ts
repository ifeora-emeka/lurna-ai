import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 150000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      console.log('[DEBUG] API Request interceptor - outgoing request');
      console.log('[DEBUG] Request URL:', config.url);
      console.log('[DEBUG] Request method:', config.method);
      
      const session = await getSession();
      console.log('[DEBUG] Session data:', session);
      
      if (session?.user?.id) {
        // Set Authorization header with Bearer token instead of x-user-id
        const token = (session as any).accessToken;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log('[DEBUG] Added Authorization Bearer token header');
        } else {
          console.log('[DEBUG] No access token found in session');
        }
      } else {
        console.log('[DEBUG] No session or user ID found');
      }
      
      console.log('[DEBUG] Final request headers:', config.headers);
      console.log('[DEBUG] Request data:', config.data);
      
      return config;
    },
    (error) => {
      console.error('[DEBUG] API Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log('[DEBUG] API Response interceptor - received response');
      console.log('[DEBUG] Response status:', response.status);
      console.log('[DEBUG] Response data:', response.data);
      return response;
    },
    (error) => {
      console.error('[DEBUG] API Response interceptor error:', error);
      console.error('[DEBUG] Error response status:', error.response?.status);
      console.error('[DEBUG] Error response data:', error.response?.data);
      
      if (error.response?.status === 401) {
        console.log('[DEBUG] Redirecting to login due to 401 error');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createApiInstance();
