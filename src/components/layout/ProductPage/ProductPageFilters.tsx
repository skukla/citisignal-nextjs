'use client';

import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import { useProductPage } from './ProductPageContext';

export function ProductPageFilters() {
  const { 
    pageData,
    activeFilters,
    setFilter,
    clearFilters,
    showMobileFilters,
    setShowMobileFilters
  } = useProductPage();
  
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