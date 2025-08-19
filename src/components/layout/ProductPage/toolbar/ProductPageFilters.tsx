'use client';

import { useState, useEffect } from 'react';
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
  
  // Persist the last valid facets to prevent flicker during refetch
  const [persistedFacets, setPersistedFacets] = useState(facets);
  
  // Optimistic filter state for immediate UI feedback
  const [optimisticFilters, setOptimisticFilters] = useState(activeFilters);
  
  useEffect(() => {
    // Only update persisted facets when we get new valid facets
    if (facets && facets.length > 0) {
      setPersistedFacets(facets);
    }
  }, [facets]);
  
  useEffect(() => {
    // Sync optimistic filters with actual filters
    setOptimisticFilters(activeFilters);
  }, [activeFilters]);
  
  // Handle filter change with optimistic update
  const handleFilterChange = (filterKey: string, value: string, checked: boolean) => {
    // Update optimistic state immediately
    setOptimisticFilters(prev => {
      const currentValues = prev[filterKey] || [];
      if (checked) {
        return { ...prev, [filterKey]: [...currentValues, value] };
      } else {
        return { ...prev, [filterKey]: currentValues.filter(v => v !== value) };
      }
    });
    
    // Then update actual filters (which updates URL)
    setFilter(filterKey, value, checked);
  };
  
  // Handle clear filters with optimistic update
  const handleClearFilters = () => {
    setOptimisticFilters({});
    clearFilters();
  };
  
  // Use persisted facets to prevent flicker
  const displayFacets = facets && facets.length > 0 ? facets : persistedFacets;
  const hasFacets = displayFacets && displayFacets.length > 0;
  
  // Only show skeleton on initial load when we have no facets at all
  const showSkeleton = isInitialLoading && !hasFacets;
  
  // Hide completely only if we've loaded and confirmed no facets ever
  if (!isInitialLoading && !hasFacets) {
    return null;
  }
  
  // Always show content once we have facets, never go back to skeleton
  return (
    <LayeredTransition
      skeleton={<FilterSidebarSkeleton />}
      content={
        <FilterSidebarResponsive 
          filters={displayFacets || []}
          activeFilters={optimisticFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
        />
      }
      showContent={hasFacets}
      duration={300}
    />
  );
}