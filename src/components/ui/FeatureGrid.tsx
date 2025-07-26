'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type FeatureGridProps = BaseGridProps;

export default function FeatureGrid({
  children,
  columns = GRID_CONFIGS.feature,
  gap = 'lg',
  centered,
  className
}: FeatureGridProps) {
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