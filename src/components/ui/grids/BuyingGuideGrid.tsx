'use client';

import BuyingGuidePreview from '../previews/BuyingGuidePreview';
import Grid from './Grid';
import type { GridProps } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

interface BuyingGuide {
  icon: HeroIcon;
  title: string;
  description: string;
  href?: string;
}

interface BuyingGuideGridProps {
  guides: BuyingGuide[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
}

export default function BuyingGuideGrid({
  guides,
  columns = {
    sm: 1,
    md: 2,
    lg: 2
  },
  gap = 'lg',
  className
}: BuyingGuideGridProps) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={className}
    >
      {guides.map((guide, index) => (
        <BuyingGuidePreview
          key={index}
          icon={guide.icon}
          title={guide.title}
          description={guide.description}
          href={guide.href || '#'}
        />
      ))}
    </Grid>
  );
}