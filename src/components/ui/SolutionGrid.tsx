'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type SolutionGridProps = BaseGridProps;

export default function SolutionGrid({
  children,
  columns = GRID_CONFIGS.solution,
  gap = 'lg',
  centered,
  className
}: SolutionGridProps) {
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