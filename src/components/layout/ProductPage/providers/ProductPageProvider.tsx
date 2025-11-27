'use client';

import { ReactNode, useMemo } from 'react';
import { ProductDataContext } from './ProductDataContext';
import { ProductFilterContext } from './ProductFilterContext';
import { ProductUIContext } from './ProductUIContext';
import { useProductCards } from '@/hooks/products/useProductCards';
import { useProductFacets } from '@/hooks/products/useProductFacets';
import { useProductList } from '../hooks/useProductList';
import { useProductPageParams } from '../hooks/useProductPageParams';
import { usePageLoading } from '../hooks/usePageLoading';
import type { PageData } from '../types';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';
import type { BaseProduct } from '@/types/commerce';

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
  limit = DEFAULT_PRODUCTS_PER_PAGE,
}: Props) {
  // Step 1: Get URL state (what the user is filtering/searching for)
  const urlState = useProductPageParams();

  // Step 2: Fetch product data using individual queries
  const productData = useProductCards({
    phrase: urlState.search,
    filter: {
      categoryUrlKey: category,
      // Dynamic facets
      facets: urlState.facets,
      // Legacy fields for backwards compatibility
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      color: urlState.color,
      price: urlState.price,
    },
    sort: urlState.sort,
    limit,
    facets: urlState.hasActiveFilters || !!urlState.search,
  });

  const facetsData = useProductFacets({
    phrase: urlState.search,
    filter: {
      categoryUrlKey: category,
      // Dynamic facets
      facets: urlState.facets,
      // Legacy fields for backwards compatibility
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      color: urlState.color,
      price: urlState.price,
    },
  });

  // Step 3: Manage UI preferences (independent of URL)
  const uiState = useProductList({
    products: (productData.items || []) as BaseProduct[],
  });

  // Step 4: Single source of truth for page loading state
  const activeFiltersForLoading = useMemo(() => {
    const converted: Record<string, boolean | string[] | undefined> = {};
    Object.entries(urlState.activeFilters ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        converted[key] = undefined;
      } else if (Array.isArray(value)) {
        converted[key] = value;
      } else if (typeof value === 'boolean') {
        converted[key] = value;
      } else {
        converted[key] = [String(value)];
      }
    });
    return converted;
  }, [urlState.activeFilters]);

  const pageLoadingState = usePageLoading({
    productsLoading: productData.loading,
    facetsLoading: facetsData.loading,
    searchQuery: urlState.search,
    sortBy: urlState.formattedSort,
    activeFilters: activeFiltersForLoading,
  });

  // Step 5: Provide the data to children
  return (
    <ProductDataContext.Provider
      value={{
        products: (productData.items || []) as BaseProduct[],
        loading: productData.loading ?? false,
        error: productData.error,
        totalCount: productData.totalCount ?? 0,
        hasMore: productData.hasMoreItems ?? false,
        facets: (facetsData.facets || []) as FilterSection[],
        loadMore: productData.loadMore,
        filteredProducts: (uiState.displayProducts || []) as BaseProduct[],
        isInitialLoading: pageLoadingState.isInitialLoad,
        isPageTransition: pageLoadingState.isPageTransition,
        isValidating: facetsData?.isValidating,
      }}
    >
      <ProductFilterContext.Provider
        value={{
          searchQuery: urlState.search ?? '',
          sortBy: urlState.formattedSort ?? 'RELEVANCE',
          activeFilters: (urlState.activeFilters ?? {}) as Record<
            string,
            string | number | string[] | undefined
          >,
          hasActiveFilters: urlState.hasActiveFilters ?? false,
          filterCount: urlState.filterCount ?? 0,
          category,
          setSearchQuery: urlState.updateSearch,
          setSortBy: urlState.updateSort,
          setFilter: urlState.updateFilter as (
            filterKey: string,
            value: string | number | string[] | undefined,
            checked?: boolean
          ) => void,
          clearFilters: urlState.clearFilters,
          pageData,
        }}
      >
        <ProductUIContext.Provider
          value={{
            viewMode: uiState.viewMode ?? 'grid',
            setViewMode: uiState.setViewMode,
            isTransitioning: uiState.isTransitioning ?? false,
            showMobileFilters: uiState.showMobileFilters ?? false,
            setShowMobileFilters: uiState.setShowMobileFilters,
          }}
        >
          {children}
        </ProductUIContext.Provider>
      </ProductFilterContext.Provider>
    </ProductDataContext.Provider>
  );
}
