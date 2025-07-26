'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type ToolGridProps = BaseGridProps;

export default function ToolGrid({
  children,
  columns = GRID_CONFIGS.tool,
  gap = 'lg',
  centered,
  className
}: ToolGridProps) {
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