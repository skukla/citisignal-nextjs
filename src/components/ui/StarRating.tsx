'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';
import { getFilledStars, formatRatingDisplay, formatReviewCount } from '@/lib/rating';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  showReviewCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * StarRating component for displaying star ratings with optional review count.
 * Supports different sizes and automatically converts ratings to 5-star scale.
 *
 * @example
 * ```tsx
 * <StarRating 
 *   rating={94} 
 *   reviewCount={1250}
 *   showReviewCount 
 *   size="md"
 * />
 * ```
 */
export default function StarRating({
  rating,
  maxRating = 100,
  reviewCount,
  showReviewCount = false,
  size = 'md',
  className
}: StarRatingProps) {
  const filledStars = getFilledStars(rating, maxRating);
  const displayRating = formatRatingDisplay(rating, maxRating);
  const reviewText = reviewCount ? formatReviewCount(reviewCount) : '';

  return (
    <div className={twMerge('flex items-center', className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={twMerge(
              // Size variants
              size === 'sm' && 'w-3 h-3',
              size === 'md' && 'w-4 h-4',
              size === 'lg' && 'w-5 h-5',
              // Color based on fill state
              i < filledStars ? 'text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
      
      {showReviewCount && (
        <span className={twMerge(
          'text-gray-600 ml-2',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base'
        )}>
          {displayRating} ({reviewText})
        </span>
      )}
    </div>
  );
}