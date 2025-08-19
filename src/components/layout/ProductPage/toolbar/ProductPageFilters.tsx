'use client';

import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import FilterSidebarSkeleton from '@/components/ui/search/FilterSidebar/FilterSidebarSkeleton';
import { LayeredTransition } from '@/components/ui/transitions/LayeredTransition';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useProductUI } from '../providers/ProductUIContext';
import { useProductData } from '../providers/ProductDataContext';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';

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
  
  const { facets, isInitialLoading, loading } = useProductData();
  const { singleQueryMode } = useDemoInspector();
  
  // Determine if we have facets to show
  const hasFacets = facets && facets.length > 0;
  
  // Hide completely if no facets exist and we're not in initial loading
  if (!isInitialLoading && !loading && !hasFacets) {
    return null;
  }
  
  // Determine what to show:
  // - During initial load: show skeleton
  // - After initial load with facets: always show facets (never hide during updates)
  // - In single query mode, facets should stay visible during loading to prevent layout shift
  const showContent = !isInitialLoading && hasFacets;
  
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
      showContent={showContent}
      duration={300}
    />
  );
}