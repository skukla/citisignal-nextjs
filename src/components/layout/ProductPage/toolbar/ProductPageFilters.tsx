'use client';

import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import FilterSidebarSkeleton from '@/components/ui/search/FilterSidebar/FilterSidebarSkeleton';
import { LayeredTransition } from '@/components/ui/transitions/LayeredTransition';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useProductUI } from '../providers/ProductUIContext';
import { useProductData } from '../providers/ProductDataContext';

export function ProductPageFilters() {
  const { 
    activeFilters,
    setFilter,
    clearFilters
  } = useProductFilters();
  
  const {
    showMobileFilters,
    setShowMobileFilters
  } = useProductUI();
  
  const { facets, isInitialLoading } = useProductData();
  
  // Hide completely if no facets after loading
  if (!isInitialLoading && (!facets || facets.length === 0)) {
    return null;
  }
  
  // Layered transition for skeleton -> filters
  return (
    <LayeredTransition
      skeleton={<FilterSidebarSkeleton />}
      content={
        <FilterSidebarResponsive 
          filters={facets || []}
          activeFilters={activeFilters}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />
      }
      showContent={!isInitialLoading && facets && facets.length > 0}
      duration={300}
    />
  );
}