'use client';

import { ReactNode } from 'react';
import TwoColumnLayout from '@/components/layout/TwoColumnLayout';

interface AccountPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AccountPageLayout({ children, className }: AccountPageLayoutProps) {
  return (
    <TwoColumnLayout className={className}>
      {children}
    </TwoColumnLayout>
  );
}