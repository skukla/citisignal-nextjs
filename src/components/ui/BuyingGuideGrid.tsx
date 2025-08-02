'use client';

import { memo } from 'react';
import Grid from './Grid';
import BuyingGuideCard from './BuyingGuideCard';
import type { GridProps } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

export interface BuyingGuide {
  id: string;
  icon: HeroIcon;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  slug?: string;
}

interface BuyingGuideGridProps {
  guides: BuyingGuide[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onGuideClick?: (guide: BuyingGuide) => void;
}

/**
 * A grid component for displaying buying guide cards in a responsive layout.
 * Built on the base Grid component with BuyingGuideCard pattern.
 *
 * @example
 * ```tsx
 * <BuyingGuideGrid
 *   guides={phoneBuyingGuides}
 *   columns={{ sm: 1, md: 2 }}
 *   gap="lg"
 *   onGuideClick={(guide) => router.push(`/guides/${guide.slug}`)}
 * />
 * ```
 */
function BuyingGuideGrid({
  guides,
  columns = {
    sm: 1,
    md: 2
  },
  gap = 'lg',
  className,
  onGuideClick
}: BuyingGuideGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {guides.map((guide) => (
        <BuyingGuideCard
          key={guide.id}
          icon={guide.icon}
          title={guide.title}
          description={guide.description}
          href={guide.href}
          linkText={guide.linkText}
          onClick={onGuideClick ? () => onGuideClick(guide) : undefined}
        />
      ))}
    </Grid>
  );
}

export default memo(BuyingGuideGrid);