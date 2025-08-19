'use client';

import { useEffect, useState } from 'react';
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
  const [hasInitialized, setHasInitialized] = useState(false);
  
  useEffect(() => {
    // Mark as initialized once we've completed the first load cycle
    if (!loading && !isInitialLoading && !hasInitialized) {
      setHasInitialized(true);
    }
  }, [loading, isInitialLoading, hasInitialized]);
  
  // Determine which state to show
  // Always show skeleton during initial loading or while actively loading before initialization
  const showSkeleton = isInitialLoading || (loading && !hasInitialized) || (!hasInitialized && filteredProducts.length === 0);
  const hasError = !!error && !loading;
  // Only show empty state after we've initialized and confirmed no products
  const isEmpty = hasInitialized && !error && !loading && filteredProducts.length === 0;
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