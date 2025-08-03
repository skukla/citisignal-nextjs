'use client';

import { memo } from 'react';
import Grid from './Grid';
import TechReviewCard from '@/components/ui/cards/TechReviewCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { PlayIcon } from '@heroicons/react/24/outline';
import type { GridProps } from '@/types/grid';
import type { TechReview } from '@/types/content';

export type { TechReview };

interface TechReviewGridProps {
  reviews: TechReview[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onReviewClick?: (review: TechReview) => void;
  emptyState?: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * A grid component for displaying tech review cards in a responsive layout.
 * Built on the base Grid component with TechReviewCard pattern.
 *
 * @example
 * ```tsx
 * <TechReviewGrid
 *   reviews={techReviews}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="lg"
 *   onReviewClick={(review) => router.push(`/reviews/${review.slug}`)}
 * />
 * ```
 */
function TechReviewGrid({
  reviews,
  columns = {
    sm: 1,
    md: 2, 
    lg: 3
  },
  gap = 'lg',
  className,
  onReviewClick,
  emptyState
}: TechReviewGridProps) {
  // Handle empty state
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={PlayIcon}
        title={emptyState?.title || "No reviews found"}
        description={emptyState?.description || "There are no tech reviews to display at the moment."}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
      />
    );
  }

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {reviews.map((review) => (
        <TechReviewCard
          key={review.id}
          title={review.title}
          description={review.description}
          videoThumbnail={review.videoThumbnail}
          duration={review.duration}
          href={review.href}
          onClick={onReviewClick ? () => onReviewClick(review) : undefined}
        />
      ))}
    </Grid>
  );
}

export default memo(TechReviewGrid);