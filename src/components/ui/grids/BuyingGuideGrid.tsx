'use client';

import { memo } from 'react';
import Grid from './Grid';
import BuyingGuideCard from '@/components/ui/cards/BuyingGuideCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import type { GridProps } from '@/types/grid';
import type { BuyingGuide } from '@/types/content';

export type { BuyingGuide };

interface BuyingGuideGridProps {
  guides: BuyingGuide[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onGuideClick?: (guide: BuyingGuide) => void;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
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
  onGuideClick,
  emptyState
}: BuyingGuideGridProps) {
  // Handle empty state
  if (guides.length === 0) {
    return (
      <EmptyState
        icon={BookOpenIcon}
        title={emptyState?.title || "No guides found"}
        description={emptyState?.description || "There are no buying guides to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

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