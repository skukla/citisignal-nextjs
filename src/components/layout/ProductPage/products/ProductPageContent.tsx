'use client';

import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';
import { LayeredTransition } from '@/components/ui/transitions/LayeredTransition';
import ProductPageSkeleton from '../states/ProductPageSkeleton';
import ProductPageError from '../states/ProductPageError';
import ProductPageEmpty from '../states/ProductPageEmpty';
import ProductPageProducts from './ProductPageProducts';

export function ProductPageContent() {
  const { error, filteredProducts, isInitialLoading, loading } = useProductData();
  const { pageData } = useProductFilters();
  
  // Determine which state to show
  const showSkeleton = isInitialLoading || (loading && filteredProducts.length === 0);
  const hasError = !!error;
  const isEmpty = !error && filteredProducts.length === 0;
  const hasProducts = !error && filteredProducts.length > 0;
  
  // Special handling for error and empty states
  if (!showSkeleton && hasError) {
    return <ProductPageError error={error} />;
  }
  
  if (!showSkeleton && isEmpty) {
    return <ProductPageEmpty />;
  }
  
  // Layered transition for skeleton -> products (most common case)
  return (
    <LayeredTransition
      skeleton={<ProductPageSkeleton count={pageData.loadingSkeletonCount || 12} />}
      content={<ProductPageProducts />}
      showContent={!showSkeleton && hasProducts}
      duration={300}
    />
  );
}