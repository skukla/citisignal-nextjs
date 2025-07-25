'use client';

import TechReviewCard from './TechReviewCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface TechReview {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

interface TechReviewGridProps {
  reviews: TechReview[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
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
    <BaseGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {reviews.map((review, index) => (
        <TechReviewCard
          key={index}
          title={review.title}
          description={review.description}
          image={review.image}
          href={review.href}
        />
      ))}
    </BaseGrid>
  );
} 