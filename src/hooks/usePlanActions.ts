'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/ui/layout/Cart/useCart';
import { useWishlist } from '@/components/ui/cards/ProductCard/useWishlist';
import type { Plan } from '@/types/commerce';

export interface UsePlanActionsReturn {
  selectPlan: (planId: string) => void;
  learnMore: (planId: string) => void;
  toggleWishlist: (planId: string, isCurrentlyWishlisted: boolean) => void;
  addToCart: (plan: Plan) => void;
  isWishlisted: (planId: string) => boolean;
}

/**
 * Business logic hook for plan-related actions.
 * Handles plan selection, navigation, wishlist, and cart operations.
 * 
 * @returns {Object} Plan action handlers
 * @example
 * const {
 *   selectPlan,
 *   learnMore,
 *   toggleWishlist,
 *   addToCart,
 *   isWishlisted
 * } = usePlanActions();
 * 
 * <PlanGrid
 *   plans={plans}
 *   onSelectPlan={selectPlan}
 *   onLearnMore={learnMore}
 *   onWishlistToggle={toggleWishlist}
 * />
 */
export function usePlanActions(): UsePlanActionsReturn {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleWishlist: toggleWishlistState, isWishlisted } = useWishlist();

  /**
   * Handles plan selection - navigates to checkout with selected plan
   */
  const selectPlan = useCallback((planId: string) => {
    // Navigate to checkout with the selected plan ID as a query parameter
    router.push(`/checkout?plan=${planId}`);
  }, [router]);

  /**
   * Handles plan details navigation - navigates to plan details page
   */
  const learnMore = useCallback((planId: string) => {
    // Navigate to plan details page (assuming we have plan detail pages)
    router.push(`/plans/${planId}`);
  }, [router]);

  /**
   * Handles wishlist toggle with business logic
   */
  const toggleWishlist = useCallback((planId: string, isCurrentlyWishlisted: boolean) => {
    toggleWishlistState(planId);
    
    // TODO: In a real app, you might want to:
    // - Show toast notification
    // - Sync with backend
    // - Track analytics event
    console.log(
      `Plan ${planId} ${isCurrentlyWishlisted ? 'removed from' : 'added to'} wishlist`
    );
  }, [toggleWishlistState]);

  /**
   * Adds a plan to the cart
   */
  const addToCart = useCallback((plan: Plan) => {
    addItem({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      imageUrl: plan.images?.[0]?.url || ''
    });
    
    // TODO: In a real app, you might want to:
    // - Show cart slide-out
    // - Track analytics event
    // - Show success notification
    console.log(`Plan ${plan.name} added to cart`);
  }, [addItem]);

  return {
    selectPlan,
    learnMore,
    toggleWishlist,
    addToCart,
    isWishlisted
  };
}