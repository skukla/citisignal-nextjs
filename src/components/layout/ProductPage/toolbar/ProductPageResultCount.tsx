'use client';

import ResultsCount from '@/components/ui/search/ResultsCount';
import { LayeredTransition } from '@/components/ui/transitions/LayeredTransition';
import { useProductData } from '../providers/ProductDataContext';
import { useProductFilters } from '../providers/ProductFilterContext';

export function ProductPageResultCount() {
  const { filteredProducts, isInitialLoading } = useProductData();
  const { pageData } = useProductFilters();
  const itemLabel = pageData.search.itemLabel || 'items';
  
  return (
    <div className="mb-6">
      <LayeredTransition
        skeleton={
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 bg-[length:200%_100%] animate-shimmer"></div>
        }
        content={
          <ResultsCount 
            showing={filteredProducts.length} 
            total={filteredProducts.length} 
            itemLabel={itemLabel}
          />
        }
        showContent={!isInitialLoading}
        duration={300}
        className="min-h-[20px]"
      />
    </div>
  );
}