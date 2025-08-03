'use client';

import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';

export interface ProductListLayoutRootProps extends BaseComponentProps {
  children: ReactNode;
}

/**
 * Root container for ProductListLayout compound component.
 * Provides basic page structure and styling.
 */
export function ProductListLayoutRoot({ 
  children, 
  className = '' 
}: ProductListLayoutRootProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}