'use client';

import ResultsCount from '@/components/ui/search/ResultsCount';
import { useProductPage } from './ProductPageContext';

export function ProductPageResultCount() {
  const { filteredProducts, pageData } = useProductPage();
  const itemLabel = pageData.search.itemLabel || 'items';
  
  return (
    <ResultsCount 
      showing={filteredProducts.length} 
      total={filteredProducts.length} 
      itemLabel={itemLabel}
    />
  );
}