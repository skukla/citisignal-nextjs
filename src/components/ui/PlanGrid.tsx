'use client';

import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface PlanGridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PlanGrid({
  children,
  columns = {
    sm: 1,
    lg: 2,
    xl: 3
  },
  gap = 'md',
  className
}: PlanGridProps) {
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