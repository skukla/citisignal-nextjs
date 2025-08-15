'use client';

import { ReactNode } from 'react';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  // The individual account pages now handle their own layout
  // using the AccountPage compound components
  return <>{children}</>;
}