'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type ProductGridProps = BaseGridProps;

export default function ProductGrid({
  children,
  columns = GRID_CONFIGS.product,
  gap = 'lg',
  centered,
  className
}: ProductGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      centered={centered}
      className={className}
    >
      {children}
    </BaseGrid>
  );
} 