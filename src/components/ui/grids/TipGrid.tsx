'use client';

import { memo } from 'react';
import Grid from './Grid';
import TipCard from '@/components/ui/cards/TipCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import type { GridProps } from '@/types/grid';
import type { Tip } from '@/types/content';

export type { Tip };

interface TipGridProps {
  tips: Tip[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onTipClick?: (tip: Tip) => void;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * A grid component for displaying tip cards in a responsive layout.
 * Built on the base Grid component with TipCard pattern.
 *
 * @example
 * ```tsx
 * <TipGrid
 *   tips={phoneTips}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="md"
 *   onTipClick={(tip) => router.push(`/tips/${tip.slug}`)}
 * />
 * ```
 */
function TipGrid({
  tips,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'md',
  className,
  onTipClick,
  emptyState
}: TipGridProps) {
  // Handle empty state
  if (tips.length === 0) {
    return (
      <EmptyState
        icon={LightBulbIcon}
        title={emptyState?.title || "No tips found"}
        description={emptyState?.description || "There are no tips to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          category={tip.category}
          title={tip.title}
          description={tip.description}
          href={tip.href}
          onClick={onTipClick ? () => onTipClick(tip) : undefined}
        />
      ))}
    </Grid>
  );
}

export default memo(TipGrid);