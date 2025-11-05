'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface AccountPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AccountPageLayout({ children, className }: AccountPageLayoutProps) {
  return <div className={twMerge('flex flex-col lg:flex-row gap-8', className)}>{children}</div>;
}
