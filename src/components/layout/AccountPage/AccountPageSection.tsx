'use client';

import { ReactNode } from 'react';

interface AccountPageSectionProps {
  children: ReactNode;
  className?: string;
}

export function AccountPageSection({ 
  children, 
  className
}: AccountPageSectionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}