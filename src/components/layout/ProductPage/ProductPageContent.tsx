'use client';

import { useProductPage } from './ProductPageContext';
import ProductPageSkeleton from './ProductPageSkeleton';
import ProductPageError from './ProductPageError';
import ProductPageEmpty from './ProductPageEmpty';
import ProductPageProducts from './ProductPageProducts';

export function ProductPageContent() {
  const { 
    loading, 
    error, 
    filteredProducts,
    pageData 
  } = useProductPage();
  
  // Initial loading state
  if (loading && filteredProducts.length === 0) {
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