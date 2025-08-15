'use client';

import { ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { AccountPageContext, type AccountPageData } from './AccountPageContext';
import { useAccountNavigation } from '@/components/ui/layout/Account/useAccountNavigation';
import { useAuth } from '@/components/ui/layout/Account/useAuth';

interface AccountPageProviderProps {
  children: ReactNode;
  pageData: AccountPageData;
}

export function AccountPageProvider({ 
  children, 
  pageData 
}: AccountPageProviderProps) {
  const pathname = usePathname();
  const { navigation, isActive } = useAccountNavigation();
  const { user, isLoading } = useAuth();
  
  const contextValue = useMemo(() => ({
    // User data
    user,
    isLoading,
    
    // Navigation
    navigation,
    currentPath: pathname,
    isActive,
    
    // Page configuration
    pageData
  }), [user, isLoading, navigation, pathname, isActive, pageData]);

  return (
    <AccountPageContext.Provider value={contextValue}>
      {children}
    </AccountPageContext.Provider>
  );
}