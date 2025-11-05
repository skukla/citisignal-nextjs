'use client';

import { twMerge } from 'tailwind-merge';
import PlanCardHeader from './PlanCardHeader';
import PlanCardFeatures from './PlanCardFeatures';
import PlanCardActions from './PlanCardActions';
import PlanBadge from '@/components/ui/badges/PlanBadge';
import { isPlanPopular, isPlanNew, formatPlanFeatures } from '@/lib/plan';
import { isSalePrice } from '@/lib/pricing';
import type { PlanCardProps } from './PlanCard.types';

/**
 * PlanCard component for displaying mobile plans with pricing, features, and actions.
 * Uses compound component architecture for better maintainability and customization.
 *
 * @example
 * ```tsx
 * <PlanCard
 *   plan={planData}
 *   onSelectPlan={(id) => router.push(`/checkout?plan=${id}`)}
 *   onLearnMore={(id) => router.push(`/plans/${id}`)}
 *   onWishlistToggle={(id, saved) => updateWishlist(id, saved)}
 * />
 * ```
 */
export default function PlanCard({
  plan,
  onSelectPlan,
  onLearnMore,
  onWishlistToggle,
  className,
}: PlanCardProps) {
  // Use extracted business logic functions
  const isPopular = isPlanPopular(plan.type);
  const isNew = isPlanNew(plan);
  const isSale = isSalePrice(plan.originalPrice, plan.price);
  const formattedFeatures = formatPlanFeatures(plan);

  // Convert price strings to numbers for PlanCardHeader
  const priceValue =
    typeof plan.price === 'string'
      ? parseFloat(plan.price.replace(/[^0-9.]/g, ''))
      : plan.priceValue;
  const originalPriceValue =
    plan.originalPriceValue ||
    (plan.originalPrice
      ? typeof plan.originalPrice === 'string'
        ? parseFloat(plan.originalPrice.replace(/[^0-9.]/g, ''))
        : plan.originalPrice
      : undefined);
  // Plan doesn't have reviews property - use 0 as defaults
  const rating = 0;
  const reviewCount = 0;

  return (
    <div
      className={twMerge(
        'bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col',
        isPopular ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' : 'border-gray-200',
        className
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <PlanBadge variant="popular" className="px-3 py-1 rounded-full" />
        </div>
      )}

      {/* Header Section */}
      <PlanCardHeader
        name={plan.name}
        type={plan.type}
        price={priceValue}
        originalPrice={originalPriceValue}
        rating={rating}
        reviewCount={reviewCount}
        isNew={isNew}
        isSale={isSale}
        onWishlistToggle={(saved) => onWishlistToggle?.(plan.id, saved)}
      />

      {/* Features Section */}
      <PlanCardFeatures plan={plan} features={formattedFeatures} />

      {/* Actions Section */}
      <PlanCardActions
        onSelectPlan={() => onSelectPlan?.(plan.id)}
        onLearnMore={() => onLearnMore?.(plan.id)}
      />
    </div>
  );
}
