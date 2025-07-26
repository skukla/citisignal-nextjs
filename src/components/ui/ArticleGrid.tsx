'use client';

import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import { GRID_CONFIGS } from '@/types/grid';

type ArticleGridProps = BaseGridProps;

export default function ArticleGrid({
  children,
  columns = GRID_CONFIGS.article,
  gap = 'lg',
  centered,
  className
}: ArticleGridProps) {
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