import { createContext, useContext } from 'react';
import type { BaseProduct, Facet } from '@/types/commerce';

/**
 * Context for product data and server-side operations
 * Handles data fetching, filtering, and pagination
 */
interface ProductDataContextValue {
  // Product data
  products: BaseProduct[];
  loading: boolean;
  error?: Error;
  totalCount: number;
  hasMore: boolean;
  facets?: Facet[];
  
  // Pagination
  loadMore: () => void;
  
  // Computed
  filteredProducts: BaseProduct[];
}

export const ProductDataContext = createContext<ProductDataContextValue | undefined>(undefined);

export function useProductData() {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error('useProductData must be used within ProductDataProvider');
  }
  return context;
}