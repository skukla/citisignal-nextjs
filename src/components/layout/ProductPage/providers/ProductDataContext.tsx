import { createContext, useContext } from 'react';
import type { BaseProduct } from '@/types/commerce';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

/**
 * Context for product data and operations
 * Handles data fetching, filtering, and pagination
 */
interface ProductDataContextValue {
  // Product data
  products: BaseProduct[];
  loading: boolean;
  error?: Error;
  totalCount: number;
  hasMore: boolean;
  facets: FilterSection[];

  // Pagination
  loadMore: () => void;

  // Computed
  filteredProducts: BaseProduct[];

  // Coordinated loading state
  isInitialLoading: boolean; // True when ANY component is still loading on first render
  isPageTransition: boolean; // True during any page-level transitions (search, sort, filter)
  isValidating?: boolean; // True when revalidating data (even with existing data)
}

export const ProductDataContext = createContext<ProductDataContextValue | undefined>(undefined);

export function useProductData() {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error('useProductData must be used within ProductDataProvider');
  }
  return context;
}
