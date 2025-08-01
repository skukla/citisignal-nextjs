'use client';

import { twMerge } from 'tailwind-merge';
import { calculateDiscountPercentage } from '@/lib/pricing';

export type PlanBadgeVariant = 'popular' | 'new' | 'sale';

interface PlanBadgeProps {
  variant: PlanBadgeVariant;
  originalPrice?: number;
  salePrice?: number;
  className?: string;
}

/**
 * PlanBadge component for displaying promotional badges on plans.
 * Supports popular, new, and sale badges with automatic discount calculation.
 *
 * @example
 * ```tsx
 * <PlanBadge variant="popular" />
 * <PlanBadge variant="new" />
 * <PlanBadge variant="sale" originalPrice={100} salePrice={75} />
 * ```
 */
export default function PlanBadge({
  variant,
  originalPrice,
  salePrice,
  className
}: PlanBadgeProps) {
  const getBadgeContent = () => {
    switch (variant) {
      case 'popular':
        return 'MOST POPULAR';
      case 'new':
        return 'NEW';
      case 'sale':
        if (originalPrice && salePrice) {
          const discount = calculateDiscountPercentage(originalPrice, salePrice);
          return `${discount}% OFF`;
        }
        return 'SALE';
      default:
        return '';
    }
  };

  const getBadgeStyles = () => {
    switch (variant) {
      case 'popular':
        return 'bg-purple-600 text-white';
      case 'new':
        return 'bg-green-500 text-white';
      case 'sale':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

  return (
    <span className={twMerge(
      'text-[11px] font-bold px-1.5 py-0.5 rounded',
      getBadgeStyles(),
      className
    )}>
      {getBadgeContent()}
    </span>
  );
}