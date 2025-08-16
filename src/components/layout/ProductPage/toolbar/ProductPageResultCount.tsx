'use client';

import ResultsCount from '@/components/ui/search/ResultsCount';
import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageResultCount() {
  const { filteredProducts, isInitialLoading } = useProductData();
  const { pageData } = useProductFilters();
  const itemLabel = pageData.search.itemLabel || 'items';
  
  // Show skeleton during page loading (initial load or search)
  if (isInitialLoading) {
    return (
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    );
  }
  
  return (
    <ResultsCount 
      showing={filteredProducts.length} 
      total={filteredProducts.length} 
      itemLabel={itemLabel}
    />
  );
}