'use client';

import { ReactNode } from 'react';
import Container from '@/components/ui/Container';

export interface ProductListLayoutContentProps {
  children: ReactNode;
}

/**
 * Main content area for ProductListLayout.
 * Provides the flex layout structure for sidebar + grid.
 */
export function ProductListLayoutContent({ children }: ProductListLayoutContentProps) {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-8">
        {children}
      </div>
    </Container>
  );
}