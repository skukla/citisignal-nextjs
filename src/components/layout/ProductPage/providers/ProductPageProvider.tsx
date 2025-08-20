'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { ProductDataContext } from './ProductDataContext';
import { ProductFilterContext } from './ProductFilterContext';
import { ProductUIContext } from './ProductUIContext';
import { useProductCards } from '@/hooks/products/useProductCards';
import { useProductFacets } from '@/hooks/products/useProductFacets';
import { useCategoryPageData } from '@/hooks/products/useCategoryPageData';
import { useProductList } from '../hooks/useProductList';
import { useProductPageParams } from '../hooks/useProductPageParams';
import { usePageLoading } from '../hooks/usePageLoading';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';
import { useNavigation } from '@/contexts/NavigationContext';
import type { PageData } from '../types';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

// Constants
const DEFAULT_PRODUCTS_PER_PAGE = 12;

// Note: The mesh already provides data in the correct format.
// We're just doing type assertions here, not transformations.

interface Props {
  children: ReactNode;
  category?: string;
  pageData: PageData;
  limit?: number;
}

/**
 * ProductPageProvider orchestrates three concerns:
 * 1. URL State (filters, search, sort) 
 * 2. Product Data (fetching, pagination)
 * 3. UI State (view mode, mobile filters)
 * 
 * Each concern gets its own context to prevent unnecessary re-renders.
 */
export function ProductPageProvider({ 
  children, 
  category,
  pageData,
  limit = DEFAULT_PRODUCTS_PER_PAGE 
}: Props) {
  // Step 1: Get URL state (what the user is filtering/searching for)
  const urlState = useProductPageParams();
  const { singleQueryMode } = useDemoInspector();
  const { setBreadcrumbs, setIsLoadingFromUnified } = useNavigation();
  
  // Store previous facets to prevent them from disappearing during loading in single query mode
  const previousFacetsRef = useRef<Array<{
    key: string;
    title: string;
    type: string;
    options: Array<{
      id: string;
      name: string;
      count: number;
    }>;
  }>>([]);
  
  // Track if user has interacted with filters/sort (to switch from unified to individual queries)
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  
  // Store initial URL state for unified query (frozen after initial load)
  const initialUrlStateRef = useRef(urlState);
  
  // Track the previous URL state to detect user interactions
  const previousUrlStateRef = useRef(urlState);
  
  // Track if this is the initial mount to skip reset effect
  const isInitialMountRef = useRef(true);
  
  // Detect user interaction with filters/sort
  useEffect(() => {
    if (isInitialMountRef.current) {
      return; // Skip on initial mount
    }
    
    // Check if any filter or sort values changed
    const filtersChanged = 
      urlState.manufacturer !== previousUrlStateRef.current.manufacturer ||
      urlState.memory !== previousUrlStateRef.current.memory ||
      urlState.colors !== previousUrlStateRef.current.colors ||
      urlState.priceMin !== previousUrlStateRef.current.priceMin ||
      urlState.priceMax !== previousUrlStateRef.current.priceMax ||
      urlState.search !== previousUrlStateRef.current.search ||
      urlState.formattedSort !== previousUrlStateRef.current.formattedSort;
    
    if (filtersChanged && singleQueryMode) {
      setUserHasInteracted(true);
    }
    
    previousUrlStateRef.current = urlState;
  }, [urlState, singleQueryMode]);
  
  // Reset when switching modes or changing categories
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return; // Skip on initial mount
    }
    setUserHasInteracted(false);
    initialUrlStateRef.current = urlState; // Capture new initial state
  }, [singleQueryMode, category]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Step 2: Determine query strategy
  // In single query mode: use unified until user interacts, then switch to individual queries
  // This improves initial load performance by reducing the number of requests
  const useUnifiedQuery = singleQueryMode && !userHasInteracted;
  
  // Step 2a: Prepare filter for unified query (using frozen initial state)
  const unifiedFilter = useUnifiedQuery ? {
    manufacturer: initialUrlStateRef.current.manufacturer,
    memory: initialUrlStateRef.current.memory,
    colors: initialUrlStateRef.current.colors,
    priceMin: initialUrlStateRef.current.priceMin,
    priceMax: initialUrlStateRef.current.priceMax
  } : undefined;
  
  // Step 2b: Unified query - only for initial load in single query mode
  const unifiedData = useCategoryPageData(useUnifiedQuery ? {
    categoryUrlKey: category,
    phrase: initialUrlStateRef.current.search,
    filter: unifiedFilter,
    sort: initialUrlStateRef.current.sort ? {
      attribute: initialUrlStateRef.current.sort.attribute,
      direction: initialUrlStateRef.current.sort.direction
    } : undefined,
    pageSize: limit,
    currentPage: 1
  } : null);
  
  // Step 2c: Individual queries - used after user interaction in single query mode, or always in multi-query mode
  const productData = useProductCards(!useUnifiedQuery ? {
    phrase: urlState.search,
    filter: {
      categoryUrlKey: category,
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      colors: urlState.colors,
      priceMin: urlState.priceMin,
      priceMax: urlState.priceMax
    },
    sort: urlState.sort,
    limit,
    facets: urlState.hasActiveFilters || !!urlState.search
  } : null);
  
  // Step 2d: Fetch facets separately (when not using unified query)
  const facetsData = useProductFacets(!useUnifiedQuery ? {
    phrase: urlState.search,
    filter: {
      categoryUrlKey: category,
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      colors: urlState.colors,
      priceMin: urlState.priceMin,
      priceMax: urlState.priceMax
    }
  } : null);
  
  // Step 3: Merge data based on query strategy
  const finalProductData = useUnifiedQuery ? {
    // Using unified query (initial load in single query mode)
    items: unifiedData.data?.Citisignal_categoryPageData?.products?.items || [],
    loading: unifiedData.isLoading || (!unifiedData.data && !unifiedData.error),
    error: unifiedData.error,
    totalCount: unifiedData.data?.Citisignal_categoryPageData?.products?.items?.length || 0,
    hasMoreItems: false, // Unified query doesn't support pagination yet
    loadMore: () => {} // No-op for unified query
  } : productData; // Using individual queries
  
  // Extract facets from appropriate source
  const unifiedFacets = unifiedData.data?.Citisignal_categoryPageData?.facets?.facets;
  
  // Update stored facets when we get new ones (from either source)
  useEffect(() => {
    const currentFacets = useUnifiedQuery ? unifiedFacets : facetsData?.facets;
    if (currentFacets && currentFacets.length > 0) {
      previousFacetsRef.current = currentFacets;
    }
  }, [unifiedFacets, facetsData?.facets, useUnifiedQuery]);
  
  // Set breadcrumbs from unified query when in single query mode
  useEffect(() => {
    if (useUnifiedQuery) {
      if (unifiedData.isLoading) {
        // Mark that unified query is loading
        setIsLoadingFromUnified(true);
      } else if (unifiedData.data?.Citisignal_categoryPageData?.breadcrumbs) {
        // Set breadcrumbs in navigation context
        setBreadcrumbs({
          items: unifiedData.data.Citisignal_categoryPageData.breadcrumbs.items || []
        });
        // Mark loading complete
        setIsLoadingFromUnified(false);
      }
    }
  }, [useUnifiedQuery, unifiedData.isLoading, unifiedData.data, setBreadcrumbs, setIsLoadingFromUnified]);
  
  const finalFacetsData = useUnifiedQuery ? {
    // Using unified query
    facets: unifiedFacets || (unifiedData.isLoading ? previousFacetsRef.current : []),
    loading: unifiedData.isLoading || (!unifiedData.data && !unifiedData.error),
    error: unifiedData.error
  } : {
    // Using individual queries - also preserve facets during loading
    facets: facetsData.facets.length > 0 ? facetsData.facets : (facetsData.loading ? previousFacetsRef.current : []),
    loading: facetsData.loading,
    error: facetsData.error
  };
  
  // Step 4: Manage UI preferences (independent of URL)
  const uiState = useProductList({ 
    products: (finalProductData.items || []) as any[] 
  });
  
  // Step 5: Single source of truth for page loading state
  const pageLoading = usePageLoading({
    productsLoading: finalProductData.loading,
    facetsLoading: finalFacetsData.loading,
    searchQuery: urlState.search,
    sortBy: urlState.formattedSort
  });
  
  // Now just provide the data to children
  return (
    <ProductDataContext.Provider value={{
      products: (finalProductData.items || []) as any[],
      loading: finalProductData.loading ?? false,
      error: finalProductData.error,
      totalCount: finalProductData.totalCount ?? 0,
      hasMore: finalProductData.hasMoreItems ?? false,
      facets: (finalFacetsData.facets || []) as FilterSection[],  // Type assertion needed until mesh is deployed
      loadMore: finalProductData.loadMore,
      filteredProducts: (uiState.displayProducts || []) as any[],
      isInitialLoading: pageLoading
    }}>
      <ProductFilterContext.Provider value={{
        searchQuery: urlState.search ?? '',
        sortBy: urlState.formattedSort ?? 'RELEVANCE',
        activeFilters: (urlState.activeFilters ?? {}) as Record<string, string | number | string[] | undefined>,
        hasActiveFilters: urlState.hasActiveFilters ?? false,
        filterCount: urlState.filterCount ?? 0,
        category,
        setSearchQuery: urlState.updateSearch,
        setSortBy: urlState.updateSort,
        setFilter: urlState.updateFilter as (filterKey: string, value: string | number | string[] | undefined, checked?: boolean) => void,
        clearFilters: urlState.clearFilters,
        pageData
      }}>
        <ProductUIContext.Provider value={{
          viewMode: uiState.viewMode ?? 'grid',
          setViewMode: uiState.setViewMode,
          isTransitioning: uiState.isTransitioning ?? false,
          showMobileFilters: uiState.showMobileFilters ?? false,
          setShowMobileFilters: uiState.setShowMobileFilters
        }}>
          {children}
        </ProductUIContext.Provider>
      </ProductFilterContext.Provider>
    </ProductDataContext.Provider>
  );
}