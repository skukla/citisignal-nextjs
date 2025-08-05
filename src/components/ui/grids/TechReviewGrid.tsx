'use client';

import VideoPreview from '../previews/VideoPreview';
import Grid from './Grid';
import type { GridProps } from '@/types/grid';
import type { TechReview } from '@/types/content';

interface TechReviewGridProps {
  reviews: TechReview[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
}

export default function TechReviewGrid({
  reviews,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'lg',
  className
}: TechReviewGridProps) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={className}
    >
      {reviews.map((review, index) => (
        <VideoPreview
          key={index}
          title={review.title}
          description={review.description}
          image={review.videoThumbnail}
          href={review.href || `/reviews/${review.slug}`}
        />
      ))}
    </Grid>
  );
}