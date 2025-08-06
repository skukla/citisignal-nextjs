'use client';

import { twMerge } from 'tailwind-merge';
import type { BaseComponentProps } from '@/types/ui';

/**
 * Root layout component that provides minimum height for the page.
 * Used in layout.tsx to contain the entire application layout.
 */
export default function Root({ 
  children,
  className 
}: BaseComponentProps) {
  return (
    <div className={twMerge('min-h-screen w-full', className)}>
      {children}
    </div>
  );
}