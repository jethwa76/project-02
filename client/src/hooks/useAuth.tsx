import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/auth';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (payload: { email: string; password: string }) => Promise<void>;
  signUp: (payload: { name: string; email: string; password: string; role?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('stellar_access_token')));

  useEffect(() => {
    if (!localStorage.getItem('stellar_access_token')) return;
    authService
      .getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn: async (payload) => {
        const result = await authService.login(payload);
        localStorage.setItem('stellar_access_token', result.accessToken);
        setUser(result.user);
      },
      signUp: async (payload) => {
        const result = await authService.register(payload);
        localStorage.setItem('stellar_access_token', result.accessToken);
        setUser(result.user);
      },
      signOut: async () => {
        await authService.logout().catch(() => undefined);
        localStorage.removeItem('stellar_access_token');
        setUser(null);
      },
      updateUser: (newUser: User) => {
        setUser(newUser);
      }
    }),
    [loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
