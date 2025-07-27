'use client';

import { twMerge } from 'tailwind-merge';
import BaseGrid from './layout/BaseGrid';
import type { GridConfig } from '@/types/layout';
import { GRID_CONFIGS } from '@/types/layout';

interface PlanGridProps {
  children: React.ReactNode;
  config?: GridConfig;
  centered?: boolean;
  className?: string;
}

export default function PlanGrid({
  children,
  config = GRID_CONFIGS.plans,
  centered,
  className
}: PlanGridProps) {
  return (
    <BaseGrid
      columns={config.columns}
      gap={config.gap}
      centered={centered}
      className={twMerge('w-full', className)}
    >
      {children}
    </BaseGrid>
  );
} 