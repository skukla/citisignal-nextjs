'use client';

import TipPreview from '../previews/TipPreview';
import Grid from './Grid';
import type { GridProps } from '@/types/grid';

interface Tip {
  category: string;
  title: string;
  description: string;
  href?: string;
  categoryColor?: string;
}

interface TipGridProps {
  tips: Tip[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
}

export default function TipGrid({
  tips,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'lg',
  className
}: TipGridProps) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={className}
    >
      {tips.map((tip, index) => (
        <TipPreview
          key={index}
          category={tip.category}
          title={tip.title}
          description={tip.description}
          href={tip.href || '#'}
          categoryColor={tip.categoryColor}
        />
      ))}
    </Grid>
  );
}