import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth-options';

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
      
      let session;
      
      if (typeof window === 'undefined') {
        try {
          session = await getServerSession(authOptions);
          console.log('[DEBUG] Server-side session data:', {
            hasSession: !!session,
            hasUser: !!session?.user,
            userId: session?.user?.id,
            hasAccessToken: !!(session as any)?.accessToken
          });
        } catch (error) {
          console.log('[DEBUG] Failed to get server session:', error);
        }
      } else {
        session = await getSession();
        console.log('[DEBUG] Client-side session data:', {
          hasSession: !!session,
          hasUser: !!session?.user,
          userId: session?.user?.id,
          hasAccessToken: !!(session as any)?.accessToken
        });
      }
      
      if (session?.user?.id) {
        const token = (session as any).accessToken;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log('[DEBUG] Added Authorization Bearer token header (first 20 chars):', token.substring(0, 20) + '...');
        } else {
          console.log('[DEBUG] No access token found in session');
        }
      } else {
        console.log('[DEBUG] No session or user ID found');
      }
      
      console.log('[DEBUG] Final request headers:', Object.keys(config.headers || {}));
      
      return config;
    },
    (error) => {
      console.error('[DEBUG] API Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        } else {
          
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createApiInstance();
