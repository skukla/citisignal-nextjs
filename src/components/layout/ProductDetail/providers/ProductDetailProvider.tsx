'use client';

import { ProductDetailProvider as ContextProvider } from './ProductDetailContext';
// import { useProductDetail as useProductDetailHook } from '@/hooks/products/useProductDetail';
import type { ProductDetailProviderProps } from '../types';

/**
 * ProductDetailProvider orchestrates product detail data fetching and provides
 * context to all ProductDetail compound components.
 *
 * Follows the same pattern as ProductPageProvider but focused on individual products.
 */
export function ProductDetailProvider({ children }: ProductDetailProviderProps) {
  // TODO: Replace with actual hook when GraphQL resolver is ready
  // const { product, loading, error, isValidating } = useProductDetailHook({
  //   urlKey: productSlug
  // });

  // Mock data for testing the component structure
  const contextValue = {
    product: null, // Will show not found state
    loading: false,
    error: undefined,
    isValidating: false,
  };

  return <ContextProvider value={contextValue}>{children}</ContextProvider>;
}
