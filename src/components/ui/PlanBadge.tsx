'use client';

import { twMerge } from 'tailwind-merge';
import Badge from './Badge';
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
 * Built on the base Badge component with plan-specific styling and automatic discount calculation.
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
  // Inline content logic - direct conditionals following established pattern
  let content = '';
  switch (variant) {
    case 'popular':
      content = 'MOST POPULAR';
      break;
    case 'new':
      content = 'NEW';
      break;
    case 'sale':
      if (originalPrice && salePrice) {
        const discount = calculateDiscountPercentage(originalPrice, salePrice);
        content = `${discount}% OFF`;
      } else {
        content = 'SALE';
      }
      break;
  }

  if (!content) return null;

  // Direct conditional styling following Button/ProductBadge pattern
  const variantClasses = twMerge(
    'text-[11px] font-bold',
    variant === 'popular' && 'bg-purple-600 text-white',
    variant === 'new' && 'bg-green-500 text-white',
    variant === 'sale' && 'bg-red-500 text-white'
  );

  return (
    <Badge size="sm" className={twMerge(variantClasses, className)}>
      {content}
    </Badge>
  );
}