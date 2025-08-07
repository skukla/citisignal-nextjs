'use client';

import { ReactNode } from 'react';
import { AccountRoot } from '@/components/layout/Account/AccountRoot';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <AccountRoot>
      {children}
    </AccountRoot>
  );
}