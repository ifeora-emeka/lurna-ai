import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Wallet {
  id: number;
  userId: string;
  tier: number;
  totalBalance: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  wallet: Wallet | null;
  setUser: (user: AuthUser | null) => void;
  setWallet: (wallet: Wallet | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || null);
          setWallet(data.wallet || null);
        }
      } catch (e) {
        setUser(null);
        setWallet(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, wallet, setUser, setWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export { AuthProvider as CustomAuthProvider } from '@/context/auth.context';
