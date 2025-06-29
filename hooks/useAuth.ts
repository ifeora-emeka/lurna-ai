'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth(redirectTo?: string) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isAuthenticated = status === 'authenticated' && !!session;
  const isLoading = status === 'loading';
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);
  
  return {
    session,
    isLoading,
    isAuthenticated,
    user: session?.user
  };
}
