'use client';

import { ProductDetailProvider as ContextProvider } from './ProductDetailContext';
import { useProductDetail as useProductDetailHook } from '@/hooks/products/useProductDetail';
import type { ProductDetailProviderProps } from '../types';

/**
 * ProductDetailProvider orchestrates product detail data fetching and provides
 * context to all ProductDetail compound components.
 *
 * Follows the same pattern as ProductPageProvider but focused on individual products.
 */
export function ProductDetailProvider({ children, productSlug }: ProductDetailProviderProps) {
  // Use the actual GraphQL resolver hook
  const { product, loading, error, isValidating } = useProductDetailHook({
    urlKey: productSlug,
  });

  const contextValue = {
    product,
    loading,
    error,
    isValidating,
  };

  return <ContextProvider value={contextValue}>{children}</ContextProvider>;
}
