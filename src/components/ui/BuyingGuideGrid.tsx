'use client';

import BuyingGuideCard from './BuyingGuideCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';
import type { ElementType } from 'react';

interface BuyingGuide {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
}

interface BuyingGuideGridProps {
  guides: BuyingGuide[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BuyingGuideGrid({
  guides,
  columns = {
    sm: 1,
    md: 2
  },
  gap = 'lg',
  className
}: BuyingGuideGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {guides.map((guide, index) => (
        <BuyingGuideCard
          key={index}
          icon={guide.icon}
          title={guide.title}
          description={guide.description}
          href={guide.href}
        />
      ))}
    </BaseGrid>
  );
} 