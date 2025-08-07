'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { UserProfile, AuthContextValue } from './Account.types';

export function useAuth(): AuthContextValue {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual authentication API call
      // Simulated successful login
      setUser({
        id: '1',
        email,
        name: 'Test User'
      });
      router.push('/account/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const signup = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual signup API call
      // Simulated successful signup
      setUser({
        id: '1',
        email,
        name: 'Test User'
      });
      router.push('/account/dashboard');
    } catch (err) {
      setError('Failed to create account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual logout API call
      setUser(null);
      router.push('/');
    } catch (err) {
      setError('Failed to logout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading,
    error,
    login,
    signup,
    logout
  };
}
