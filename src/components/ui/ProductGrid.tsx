'use client';

import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface ProductGridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductGrid({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className
}: ProductGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {children}
    </BaseGrid>
  );
} 