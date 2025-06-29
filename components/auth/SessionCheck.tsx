'use client';

import { useAuth } from "@/hooks/useAuth";

type SessionCheckProps = {
  children: (isAuthenticated: boolean) => React.ReactNode;
};

export function SessionCheck({ children }: SessionCheckProps) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null;
  }
  
  return <>{children(isAuthenticated)}</>;
}
