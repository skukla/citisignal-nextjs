'use client';

import { twMerge } from 'tailwind-merge';
import BaseGrid from './layout/BaseGrid';
import type { GridConfig } from '@/types/layout';
import { GRID_CONFIGS } from '@/types/layout';

interface FeatureGridProps {
  features: React.ReactNode[];
  config?: GridConfig;
  centered?: boolean;
  className?: string;
}

export default function FeatureGrid({
  features,
  config = GRID_CONFIGS.features,
  centered,
  className
}: FeatureGridProps) {
  return (
    <BaseGrid
      columns={config.columns}
      gap={config.gap}
      centered={centered}
      className={twMerge('w-full', className)}
    >
      {features}
    </BaseGrid>
  );
} 