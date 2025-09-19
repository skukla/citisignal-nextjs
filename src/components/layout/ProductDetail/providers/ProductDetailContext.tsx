'use client';

import { createContext, useContext } from 'react';
import type { ProductDetailContextValue } from '../types';

// Create context with undefined default (will throw if used outside provider)
const ProductDetailContext = createContext<ProductDetailContextValue | undefined>(undefined);

// Provider component (will be created in ProductDetailProvider.tsx)
export const ProductDetailProvider = ProductDetailContext.Provider;

/**
 * Hook to access ProductDetail context
 * Throws error if used outside of ProductDetailProvider
 * Follows the same pattern as useProductPage
 */
export function useProductDetail(): ProductDetailContextValue {
  const context = useContext(ProductDetailContext);

  if (context === undefined) {
    throw new Error('useProductDetail must be used within a ProductDetailProvider');
  }

  return context;
}
