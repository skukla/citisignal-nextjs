import { createContext, useContext } from 'react';
import type { PageData } from '../types';

/**
 * Context for URL-based filtering and search
 * Manages major filters that affect SEO and shareability
 */
interface ProductFilterContextValue {
  // Current filter state
  searchQuery: string;
  sortBy: string;
  activeFilters: Record<string, string | string[] | number | undefined>;
  hasActiveFilters: boolean;
  filterCount: number;
  category?: string;
  
  // Filter actions
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setFilter: (filterKey: string, value: string | string[] | number | undefined, checked?: boolean) => void;
  clearFilters: () => void;
  
  // Page configuration
  pageData: PageData;
}

export const ProductFilterContext = createContext<ProductFilterContextValue | undefined>(undefined);

export function useProductFilters() {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error('useProductFilters must be used within ProductFilterProvider');
  }
  return context;
}