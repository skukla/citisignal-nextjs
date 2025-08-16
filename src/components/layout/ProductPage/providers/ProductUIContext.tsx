import { createContext, useContext } from 'react';
import type { ViewMode } from '../hooks/useProductList';

/**
 * Context for UI-only state
 * Manages client-side preferences and temporary UI state
 */
interface ProductUIContextValue {
  // View preferences
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isTransitioning: boolean;
  
  // Mobile UI
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

export const ProductUIContext = createContext<ProductUIContextValue | undefined>(undefined);

export function useProductUI() {
  const context = useContext(ProductUIContext);
  if (!context) {
    throw new Error('useProductUI must be used within ProductUIProvider');
  }
  return context;
}