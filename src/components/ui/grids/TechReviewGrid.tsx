'use client';

import TechReviewPreview from '../previews/TechReviewPreview';
import Grid from './Grid';
import type { GridProps } from '@/types/grid';

interface TechReview {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

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
        <TechReviewPreview
          key={index}
          title={review.title}
          description={review.description}
          image={review.image}
          href={review.href}
        />
      ))}
    </Grid>
  );
}