'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import FilterSidebarResponsive from '@/components/ui/search/FilterSidebar/FilterSidebarResponsive';
import FilterSidebarSkeleton from '@/components/ui/search/FilterSidebar/FilterSidebarSkeleton';
import { LayeredTransition } from '@/components/ui/transitions/LayeredTransition';
import { useProductFilters } from '../providers/ProductFilterContext';
import { useProductUI } from '../providers/ProductUIContext';
import { useProductData } from '../providers/ProductDataContext';

export function ProductPageFilters() {
  const { activeFilters, setFilter, clearFilters } = useProductFilters();

  const { showMobileFilters, setShowMobileFilters } = useProductUI();

  const { facets, isInitialLoading, loading, isValidating } = useProductData();

  // Track expanded sections state
  const [expandedSections] = useState<Record<string, boolean>>({});

  // Store previous facets to use during transitions
  const previousFacetsRef = useRef(facets);
  useEffect(() => {
    if (facets && facets.length > 0) {
      previousFacetsRef.current = facets;
    }
  }, [facets]);

  // Create skeleton structure from actual facets
  const skeletonSections = useMemo(() => {
    const facetsToUse = facets && facets.length > 0 ? facets : previousFacetsRef.current;
    if (facetsToUse && facetsToUse.length > 0) {
      return facetsToUse.map((f) => ({
        key: f.key,
        optionCount: f.options.length,
      }));
    }
    return undefined;
  }, [facets]);

  // Determine if we have facets to show
  const hasFacets = facets && facets.length > 0;
  const hasPreviousFacets = previousFacetsRef.current && previousFacetsRef.current.length > 0;

  // Hide completely if no facets exist and we're not in initial loading
  if (!isInitialLoading && !loading && !hasFacets && !hasPreviousFacets) {
    return null;
  }

  // Determine what to show:
  // - During initial load without previous facets: show skeleton
  // - During any load WITH previous facets: show previous facets with loading state
  // - After initial load with facets: always show facets (never hide during updates)
  const showContent = hasFacets || hasPreviousFacets;

  // Use previous facets during loading if current facets are empty
  const facetsToDisplay = hasFacets ? facets : hasPreviousFacets ? previousFacetsRef.current : [];

  // Layered transition for skeleton -> filters
  return (
    <LayeredTransition
      skeleton={
        <FilterSidebarSkeleton sections={skeletonSections} expandedSections={expandedSections} />
      }
      content={
        <FilterSidebarResponsive
          filters={facetsToDisplay || []}
          activeFilters={activeFilters}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          isValidating={isValidating || (loading && hasPreviousFacets && !hasFacets)}
        />
      }
      showContent={showContent}
      duration={300}
    />
  );
}
