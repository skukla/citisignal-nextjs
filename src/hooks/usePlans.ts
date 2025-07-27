import { useCallback } from 'react';
import { useProductList } from './useProductList';
import { plans } from '@/data/plans';
import type { Plan } from '@/types/commerce';

interface UsePlansReturn {
  // List management
  plans: Plan[];
  filteredPlans: Plan[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  handleSortChange: (value: string) => void;
  activeFilters: Record<string, string[]>;
  handleFilterChange: (key: string, value: string, checked: boolean) => void;
  handleClearFilters: () => void;
  handleLoadMore: () => void;
  hasMoreItems: boolean;
  
  // Plan actions
  handleWishlistChange: (planId: string, isWishlisted: boolean) => void;
  handleSelectPlan: (planId: string) => void;
  handleLearnMore: (planId: string) => void;
}

export function usePlans(): UsePlansReturn {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    handleLoadMore,
    hasMoreItems,
    filteredAndSortedProducts: filteredPlans
  } = useProductList({ products: plans });

  const handleWishlistChange = useCallback((planId: string, isWishlisted: boolean) => {
    console.log('Wishlist changed:', planId, isWishlisted);
    // TODO: Implement wishlist API call
  }, []);

  const handleSelectPlan = useCallback((planId: string) => {
    console.log('Selected plan:', planId);
    // TODO: Implement plan selection
  }, []);

  const handleLearnMore = useCallback((planId: string) => {
    console.log('Learn more about plan:', planId);
    // TODO: Navigate to plan details page
    window.location.href = `/plans/${planId}`;
  }, []);

  return {
    plans,
    filteredPlans,
    searchQuery,
    setSearchQuery,
    sortBy,
    handleSortChange,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    handleLoadMore,
    hasMoreItems,
    handleWishlistChange,
    handleSelectPlan,
    handleLearnMore
  };
} 