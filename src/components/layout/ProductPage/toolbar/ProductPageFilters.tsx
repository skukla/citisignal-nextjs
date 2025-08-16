'use client';

import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import FilterSidebarSkeleton from '@/components/ui/search/FilterSidebar/FilterSidebarSkeleton';
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
  
  // Show skeleton during page loading (initial load or search)
  if (isInitialLoading) {
    return <FilterSidebarSkeleton />;
  }
  
  // Hide filter sidebar if no facets available
  if (!facets || facets.length === 0) {
    return null;
  }
  
  return (
    <FilterSidebarResponsive 
      filters={facets}
      activeFilters={activeFilters}
      onFilterChange={setFilter}
      onClearFilters={clearFilters}
      showMobileFilters={showMobileFilters}
      setShowMobileFilters={setShowMobileFilters}
    />
  );
}