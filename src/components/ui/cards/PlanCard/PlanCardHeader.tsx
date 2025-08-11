'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import StarRating from '@/components/ui/content/StarRating';
import Badge from '@/components/ui/foundations/Badge';
import { formatPrice, calculateDiscountPercentage } from '@/lib/pricing';
import type { PlanCardHeaderProps } from './PlanCard.types';

/**
 * PlanCardHeader component for displaying plan title, pricing, rating, and badges.
 * Includes wishlist functionality and promotional badges.
 */
export default function PlanCardHeader({
  name,
  type,
  price,
  originalPrice,
  rating,
  reviewCount,
  isNew,
  isSale,
  onWishlistToggle,
  className
}: PlanCardHeaderProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleWishlistToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    onWishlistToggle?.(newSavedState);
  };

  return (
    <div className={twMerge('p-6 border-b border-gray-100', className)}>
      {/* Title and badges section */}
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-gray-600 capitalize">{type} Plan</p>
              
              {isNew && (
                <Badge variant="new" size="xs" className="font-bold">
                  NEW
                </Badge>
              )}
              
              {isSale && originalPrice && (
                <Badge variant="sale" size="xs" className="font-bold">
                  {calculateDiscountPercentage(originalPrice, price)}% OFF
                </Badge>
              )}
            </div>
          </div>
          
          <button
            onClick={handleWishlistToggle}
            className="p-1 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <HeartIcon 
              className={twMerge(
                'w-5 h-5',
                isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'
              )} 
            />
          </button>
        </div>
      </div>

      {/* Pricing section */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          <span className="text-gray-600 ml-1">/month</span>
        </div>
      </div>

      {/* Rating section */}
      <StarRating 
        rating={rating}
        reviewCount={reviewCount}
        showReviewCount
        size="md"
      />
    </div>
  );
}