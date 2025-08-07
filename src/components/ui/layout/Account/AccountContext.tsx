'use client';

import { createContext, useContext } from 'react';
import { usePanel } from '@/hooks/usePanel';
import { useAuthContext } from './AuthContext';
import type { AccountContextValue, AccountProviderProps } from './Account.types';

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export function AccountProvider({ children }: AccountProviderProps) {
  const { isOpen, toggle, close, panelRef } = usePanel();
  const { isAuthenticated, user } = useAuthContext();

  return (
    <AccountContext.Provider 
      value={{ 
        isOpen, 
        toggle, 
        close, 
        panelRef,
        isAuthenticated,
        user
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext(): AccountContextValue {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
}