'use client';

import { twMerge } from 'tailwind-merge';
import TechReviewCard from './TechReviewCard';

interface TechReview {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

interface TechReviewGridProps {
  reviews: TechReview[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
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
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    return classes.join(' ');
  };

  return (
    <div className={twMerge(
      'grid',
      getColumnsClass(),
      gapClasses[gap],
      className
    )}>
      {reviews.map((review, index) => (
        <TechReviewCard
          key={index}
          title={review.title}
          description={review.description}
          image={review.image}
          href={review.href}
        />
      ))}
    </div>
  );
} 