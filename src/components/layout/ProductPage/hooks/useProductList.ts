import { useState, useEffect } from 'react';
import type { BaseProduct } from '@/types/commerce';

// Animation duration for view mode transitions
const VIEW_TRANSITION_DURATION = 300;

/**
 * Simplified hook for managing UI-only product list state.
 * Handles view preferences, optimistic updates, and minor client-side refinements.
 * 
 * Major filtering and sorting is handled server-side via URL parameters.
 * This hook only manages ephemeral UI state that doesn't need to be in the URL.
 */

export type ViewMode = 'grid' | 'list';

interface UseProductListOptions {
  products?: BaseProduct[];
  initialViewMode?: ViewMode;
}

interface ProductListState {
  // UI preferences (client-side only)
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isTransitioning: boolean;
  
  // Mobile UI
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  
  // Products
  displayProducts: BaseProduct[];
  
  // UI helpers
  isEmpty: boolean;
  productCount: number;
}

export function useProductList({
  products = [],
  initialViewMode = 'grid'
}: UseProductListOptions = {}): ProductListState {
  // UI preferences - stored in localStorage for persistence
  const [viewMode, setViewModeState] = useState<ViewMode>(initialViewMode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Mobile UI state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem('productViewMode') as ViewMode;
    if (savedView && (savedView === 'grid' || savedView === 'list')) {
      setViewModeState(savedView);
    }
  }, []);
  
  // Save view preference to localStorage
  const setViewMode = (mode: ViewMode) => {
    setIsTransitioning(true);
    setViewModeState(mode);
    localStorage.setItem('productViewMode', mode);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), VIEW_TRANSITION_DURATION);
  };
  
  return {
    // UI preferences
    viewMode,
    setViewMode,
    isTransitioning,
    
    // Mobile UI
    showMobileFilters,
    setShowMobileFilters,
    
    // Products (no filtering - we show everything)
    displayProducts: products,
    
    // UI helpers
    isEmpty: products.length === 0,
    productCount: products.length
  };
}

