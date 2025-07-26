'use client';

import BuyingGuideCard from './BuyingGuideCard';
import BaseGrid from './layout/BaseGrid';
import type { BaseGridProps } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';
import { GRID_CONFIGS } from '@/types/grid';

interface BuyingGuide {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
}

type BuyingGuideGridProps = Omit<BaseGridProps, 'children'> & {
  guides: BuyingGuide[];
};

export default function BuyingGuideGrid({
  guides,
  columns = GRID_CONFIGS.buyingGuide,
  gap = 'lg',
  centered,
  className
}: BuyingGuideGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      centered={centered}
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