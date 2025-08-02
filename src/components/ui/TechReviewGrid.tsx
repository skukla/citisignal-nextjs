'use client';

import { memo } from 'react';
import Grid from './Grid';
import TechReviewCard from './TechReviewCard';
import type { GridProps } from '@/types/grid';

export interface TechReview {
  id: string;
  title: string;
  description: string;
  videoThumbnail?: string;
  duration?: string;
  href?: string;
  slug?: string;
}

interface TechReviewGridProps {
  reviews: TechReview[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onReviewClick?: (review: TechReview) => void;
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
  onReviewClick
}: TechReviewGridProps) {
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