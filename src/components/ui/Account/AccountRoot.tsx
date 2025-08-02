'use client';

import { createContext, useContext } from 'react';
import type { AccountRootProps, AccountContextValue } from './Account.types';
import { useAccount } from './useAccount';

// Create context
const AccountContext = createContext<AccountContextValue | null>(null);

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('Account components must be used within Account.Root');
  }
  return context;
}

/**
 * Root component for the Account feature. Provides context and state management
 * for user authentication and account functionality.
 *
 * @example
 * <Account.Root>
 *   <Account.Icon />
 *   <Account.Panel />
 * </Account.Root>
 */
export function AccountRoot({ children, className }: AccountRootProps) {
  const accountState = useAccount();

  return (
    <AccountContext.Provider value={accountState}>
      <div className={className}>
        {children}
      </div>
    </AccountContext.Provider>
  );
}