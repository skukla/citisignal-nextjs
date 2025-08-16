'use client';

import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';
import ProductPageSkeleton from '../states/ProductPageSkeleton';
import ProductPageError from '../states/ProductPageError';
import ProductPageEmpty from '../states/ProductPageEmpty';
import ProductPageProducts from './ProductPageProducts';

export function ProductPageContent() {
  const { error, filteredProducts, isInitialLoading, loading } = useProductData();
  const { pageData } = useProductFilters();
  
  // Show skeleton on initial load (coordinated) or when loading with no products
  if (isInitialLoading || (loading && filteredProducts.length === 0)) {
    return <ProductPageSkeleton count={pageData.loadingSkeletonCount || 12} />;
  }
  
  // Error state
  if (error) {
    return <ProductPageError error={error} />;
  }
  
  // Empty state (no products after filtering)
  if (filteredProducts.length === 0) {
    return <ProductPageEmpty />;
  }
  
  // Normal state: show products
  return <ProductPageProducts />;
}