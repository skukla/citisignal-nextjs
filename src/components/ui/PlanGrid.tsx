'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type PlanGridProps = BaseGridProps;

export default function PlanGrid({
  children,
  columns = GRID_CONFIGS.plan,
  gap = 'md',
  centered,
  className
}: PlanGridProps) {
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