import { StarIcon } from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeSize } from '@/types/theme';

interface RatingStarsProps {
  rating: number; // 0-100
  reviews?: number;
  maxStars?: number;
  size?: ThemeSize;
  activeColor?: ThemeTextColor;
  inactiveColor?: ThemeTextColor;
  reviewTextColor?: ThemeTextColor;
  className?: string;
}

export default function RatingStars({
  rating,
  reviews,
  maxStars = 5,
  size = 'sm',
  activeColor = 'text-yellow-400',
  inactiveColor = 'text-gray-300',
  reviewTextColor = 'text-gray-600',
  className
}: RatingStarsProps) {
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const normalizedRating = rating / (100 / maxStars);

  return (
    <div className={twMerge('flex items-center', className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(maxStars)].map((_, i) => (
          <StarIcon
            key={i}
            className={twMerge(
              starSizes[size],
              i < Math.floor(normalizedRating) ? activeColor : inactiveColor
            )}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className={twMerge('text-sm ml-2', reviewTextColor)}>
          {(normalizedRating).toFixed(1)} ({reviews} reviews)
        </span>
      )}
    </div>
  );
} 