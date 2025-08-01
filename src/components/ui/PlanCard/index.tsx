'use client';

import { twMerge } from 'tailwind-merge';
import PlanCardHeader from './PlanCardHeader';
import PlanCardFeatures from './PlanCardFeatures';
import PlanCardActions from './PlanCardActions';
import PlanBadge from '../PlanBadge';
import { isPlanPopular, isPlanNew, formatPlanFeatures } from '@/lib/plan';
import { isSalePrice } from '@/lib/pricing';
import type { Plan } from '@/types/commerce';

interface PlanCardProps {
  plan: Plan;
  onSelectPlan?: (planId: string) => void;
  onLearnMore?: (planId: string) => void;
  onWishlistToggle?: (planId: string, saved: boolean) => void;
  className?: string;
}

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
  className
}: PlanCardProps) {
  // Use extracted business logic functions
  const isPopular = isPlanPopular(plan.type);
  const isNew = isPlanNew(plan);
  const isSale = isSalePrice(plan.original_price, plan.price);
  const formattedFeatures = formatPlanFeatures(plan);

  const handleSelectPlan = () => {
    onSelectPlan?.(plan.id);
  };

  const handleLearnMore = () => {
    onLearnMore?.(plan.id);
  };

  const handleWishlistToggle = (saved: boolean) => {
    onWishlistToggle?.(plan.id, saved);
  };

  return (
    <div className={twMerge(
      'bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 relative h-full flex flex-col',
      isPopular ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' : 'border-gray-200',
      className
    )}>
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
        price={plan.price}
        originalPrice={plan.original_price}
        rating={plan.rating_summary}
        reviewCount={plan.review_count}
        isPopular={isPopular}
        isNew={isNew}
        onWishlistToggle={handleWishlistToggle}
      />

      {/* Features Section */}
      <PlanCardFeatures
        plan={plan}
        features={formattedFeatures}
      />

      {/* Actions Section */}
      <PlanCardActions
        onSelectPlan={handleSelectPlan}
        onLearnMore={handleLearnMore}
      />
    </div>
  );
}