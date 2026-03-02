import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Mobbin',
    email: 'mobbin.design@gmail.com'
  });

  const signIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({ name: 'Mobbin', email: 'mobbin.design@gmail.com' });
      setIsLoading(false);
    }, 500);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}