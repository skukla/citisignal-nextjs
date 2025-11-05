'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { UserProfile } from '@/components/ui/layout/Account/Account.types';
import type { AccountMenuItem } from '@/components/ui/layout/Account/Account.types';

export interface AccountPageData {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export interface AccountPageContextValue {
  // User data
  user: UserProfile | null;
  isLoading: boolean;

  // Navigation
  navigation: AccountMenuItem[];
  currentPath: string;
  isActive: (href: string) => boolean;

  // Page configuration
  pageData: AccountPageData;
}

export const AccountPageContext = createContext<AccountPageContextValue | undefined>(undefined);

export function useAccountPage() {
  const context = useContext(AccountPageContext);
  if (!context) {
    throw new Error('useAccountPage must be used within AccountPageProvider');
  }
  return context;
}
