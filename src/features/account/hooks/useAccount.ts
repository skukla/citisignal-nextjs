'use client';

import { useState, useCallback } from 'react';
import { usePanel } from '@/hooks/usePanel';
import type { AccountContextValue, UserProfile } from '../types/account.types';

export function useAccount(): AccountContextValue {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { isOpen, toggle, close, panelRef } = usePanel();

  const signIn = useCallback(() => {
    // TODO: Implement actual auth
    close();
  }, [close]);

  const signOut = useCallback(() => {
    setUser(null);
    close();
  }, [close]);

  return {
    isAuthenticated: user !== null,
    user,
    isOpen,
    toggle,
    close,
    signIn,
    signOut,
    panelRef
  };
}