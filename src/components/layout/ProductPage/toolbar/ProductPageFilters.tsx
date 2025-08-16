'use client';

import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useProductUI } from '../providers/ProductUIContext';

export function ProductPageFilters() {
  const { 
    pageData,
    activeFilters,
    setFilter,
    clearFilters
  } = useProductFilters();
  
  const {
    showMobileFilters,
    setShowMobileFilters
  } = useProductUI();
  
  return (
    <FilterSidebarResponsive 
      filters={pageData.filters}
      activeFilters={activeFilters}
      onFilterChange={setFilter}
      onClearFilters={clearFilters}
      showMobileFilters={showMobileFilters}
      setShowMobileFilters={setShowMobileFilters}
    />
  );
}