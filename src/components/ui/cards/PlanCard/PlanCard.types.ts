/**
 * PlanCard compound component types
 * Consolidated type definitions for all PlanCard sub-components
 */

import type { Plan } from '@/types/commerce';

/**
 * Props for PlanCard main component
 */
export interface PlanCardProps {
  plan: Plan;
  onSelectPlan?: (planId: string) => void;
  onLearnMore?: (planId: string) => void;
  onWishlistToggle?: (planId: string, saved: boolean) => void;
  className?: string;
}

/**
 * Props for PlanCardHeader sub-component
 */
export interface PlanCardHeaderProps {
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  onWishlistToggle?: (saved: boolean) => void;
  className?: string;
}

/**
 * Props for PlanCardFeatures sub-component
 */
export interface PlanCardFeaturesProps {
  plan: Plan;
  features: string[];
  className?: string;
}

/**
 * Props for PlanCardActions sub-component
 */
export interface PlanCardActionsProps {
  onSelectPlan?: () => void;
  onLearnMore?: () => void;
  className?: string;
}