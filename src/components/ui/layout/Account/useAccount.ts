'use client';

import { useState, useCallback } from 'react';
import { useAccountPanel } from './useAccountPanel';
import type { AccountContextValue, UserProfile } from './Account.types';

/**
 * Return type for useAccount hook
 */
export type UseAccountReturn = AccountContextValue;

/**
 * Manages account state and authentication.
 * Uses AccountContext to handle global account state.
 * @returns {Object} Account state and handlers
 * @example
 * const { user, isAuthenticated, login, logout } = useAccount();
 */
export function useAccount(): UseAccountReturn {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { isOpen, toggle, close, panelRef } = useAccountPanel();

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