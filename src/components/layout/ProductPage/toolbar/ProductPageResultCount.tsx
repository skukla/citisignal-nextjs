'use client';

import ResultsCount from '@/components/ui/search/ResultsCount';
import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageResultCount() {
  const { filteredProducts } = useProductData();
  const { pageData } = useProductFilters();
  const itemLabel = pageData.search.itemLabel || 'items';
  
  return (
    <ResultsCount 
      showing={filteredProducts.length} 
      total={filteredProducts.length} 
      itemLabel={itemLabel}
    />
  );
}