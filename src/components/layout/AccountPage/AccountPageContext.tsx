'use client';

import { createContext, useContext } from 'react';
import type { User } from '@/types/user';
import type { NavigationItem } from '@/components/ui/layout/Account/Account.types';

export interface AccountPageData {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export interface AccountPageContextValue {
  // User data
  user: User | null;
  isLoading: boolean;
  
  // Navigation
  navigation: NavigationItem[];
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