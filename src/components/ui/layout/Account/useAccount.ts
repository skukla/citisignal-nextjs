'use client';

import { useAccountPanel } from './useAccountPanel';
import { useAuthContext } from './AuthContext';
import type { AccountContextValue } from './Account.types';

/**
 * Manages account state and authentication.
 * Uses AccountContext to handle global account state.
 * @returns {AccountContextValue} Account state and handlers
 */
export function useAccount(): AccountContextValue {
  const { isOpen, toggle, close, panelRef } = useAccountPanel();
  const { isAuthenticated, user } = useAuthContext();

  return {
    isAuthenticated,
    user,
    isOpen,
    toggle,
    close,
    panelRef
  };
}