'use client';

import { twMerge } from 'tailwind-merge';
import type { BaseComponentProps } from '@/types/ui';

interface PageProps extends BaseComponentProps {
  background?: 'white' | 'gray';
}

/**
 * Provides full-width page structure with background color.
 * Use this for page-level background colors that should extend the full width.
 */
export default function Page({ 
  children, 
  background = 'white',
  className 
}: PageProps) {
  return (
    <div className={twMerge(
      'min-h-screen w-full',
      background === 'gray' ? 'bg-gray-50' : 'bg-white',
      className
    )}>
      {children}
    </div>
  );
}