'use client';

import { ReactNode } from 'react';
import { AccountPageRoot } from '@/components/ui/layout/Account/AccountPageRoot';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <AccountPageRoot>
      {children}
    </AccountPageRoot>
  );
}