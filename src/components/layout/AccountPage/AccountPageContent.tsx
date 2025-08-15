'use client';

import { ReactNode } from 'react';

interface AccountPageContentProps {
  children: ReactNode;
  className?: string;
}

export function AccountPageContent({ children, className }: AccountPageContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}