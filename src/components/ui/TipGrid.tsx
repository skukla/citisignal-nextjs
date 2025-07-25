'use client';

import TipCard from './TipCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface Tip {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor?: string;
}

interface TipGridProps {
  tips: Tip[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
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
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {tips.map((tip, index) => (
        <TipCard
          key={index}
          category={tip.category}
          title={tip.title}
          description={tip.description}
          href={tip.href}
          categoryColor={tip.categoryColor}
        />
      ))}
    </BaseGrid>
  );
} 