'use client';

import { twMerge } from 'tailwind-merge';
import type { AccountSectionContentProps } from './AccountSection.types';

export function AccountSectionContent({ 
  children,
  className 
}: AccountSectionContentProps) {
  return (
    <div className={twMerge('bg-white rounded-lg border border-gray-200 shadow-sm', className)}>
      {children}
    </div>
  );
}
