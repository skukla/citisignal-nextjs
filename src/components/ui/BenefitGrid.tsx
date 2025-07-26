'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type BenefitGridProps = Omit<BaseGridProps, 'centered'>;

export default function BenefitGrid({
  children,
  columns = GRID_CONFIGS.benefit,
  gap = 'lg',
  className
}: BenefitGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      centered
      className={className}
    >
      {children}
    </BaseGrid>
  );
} 