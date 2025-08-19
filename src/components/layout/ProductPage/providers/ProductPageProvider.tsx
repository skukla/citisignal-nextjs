'use client';

import { ReactNode } from 'react';
import { ProductDataContext } from './ProductDataContext';
import { ProductFilterContext } from './ProductFilterContext';
import { ProductUIContext } from './ProductUIContext';
import { useProductCards } from '@/hooks/products/useProductCards';
import { useProductFacets } from '@/hooks/products/useProductFacets';
import { useProductPageData } from '@/hooks/products/useProductPageData';
import { useProductList } from '../hooks/useProductList';
import { useProductPageParams } from '../hooks/useProductPageParams';
import { usePageLoading } from '../hooks/usePageLoading';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';
import type { BaseProduct } from '@/types/commerce';
import type { PageData } from '../types';

// Constants
const DEFAULT_PRODUCTS_PER_PAGE = 12;

// Helper functions for data normalization
const normalizeProducts = (items: unknown[]): BaseProduct[] => {
  return (items || []) as BaseProduct[];
};

function normalizeDataValue<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}

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
  
  // Step 2: Prepare filter for unified query (if in single query mode)
  // Convert activeFilters to Citisignal_PageFilter format
  const unifiedFilter = singleQueryMode ? {
    manufacturer: urlState.manufacturer,
    memory: urlState.memory,
    colors: urlState.colors,
    priceMin: urlState.priceMin,
    priceMax: urlState.priceMax
  } : undefined;
  
  // Step 2a: Unified query mode - single query for everything
  const unifiedData = useProductPageData(singleQueryMode ? {
    category,
    phrase: urlState.search,
    filter: unifiedFilter,
    sort: urlState.sort ? {
      attribute: urlState.sort.attribute,
      direction: urlState.sort.direction
    } : undefined,
    pageSize: limit,
    currentPage: 1
  } : {});
  
  // Step 2b: Multiple query mode - separate queries
  const productData = useProductCards(singleQueryMode ? null : {
    phrase: urlState.search,
    filter: {
      category,
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      colors: urlState.colors,
      priceMin: urlState.priceMin,
      priceMax: urlState.priceMax
    },
    sort: urlState.sort,
    limit,
    facets: urlState.hasActiveFilters || !!urlState.search
  });
  
  // Step 2c: Fetch facets separately (in multiple query mode)
  const facetsData = useProductFacets(singleQueryMode ? null : {
    phrase: urlState.search,
    filter: { category }
  });
  
  // Step 3: Merge data based on mode
  const finalProductData = singleQueryMode ? {
    items: unifiedData.data?.Citisignal_productPageData?.products?.items || [],
    loading: unifiedData.isLoading || (!unifiedData.data && !unifiedData.error),
    error: unifiedData.error,
    totalCount: unifiedData.data?.Citisignal_productPageData?.products?.items?.length || 0,
    hasMoreItems: false, // Unified query doesn't support pagination yet
    loadMore: () => {} // No-op for unified query
  } : productData;
  
  const finalFacetsData = singleQueryMode ? {
    facets: unifiedData.data?.Citisignal_productPageData?.facets?.facets || 
            unifiedData.data?.Citisignal_productPageData?.products?.aggregations || [],
    loading: unifiedData.isLoading || (!unifiedData.data && !unifiedData.error),
    error: unifiedData.error
  } : facetsData;
  
  // Step 4: Manage UI preferences (independent of URL)
  const uiState = useProductList({ 
    products: normalizeProducts(finalProductData.items) 
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
      products: normalizeDataValue(finalProductData.items, []),
      loading: normalizeDataValue(finalProductData.loading, false),
      error: finalProductData.error,
      totalCount: normalizeDataValue(finalProductData.totalCount, 0),
      hasMore: normalizeDataValue(finalProductData.hasMoreItems, false),
      facets: finalFacetsData.facets,
      loadMore: finalProductData.loadMore,
      filteredProducts: normalizeDataValue(uiState.displayProducts, []),
      isInitialLoading: pageLoading
    }}>
      <ProductFilterContext.Provider value={{
        searchQuery: normalizeDataValue(urlState.search, ''),
        sortBy: normalizeDataValue(urlState.formattedSort, 'RELEVANCE'),
        activeFilters: normalizeDataValue(urlState.activeFilters, {}),
        hasActiveFilters: normalizeDataValue(urlState.hasActiveFilters, false),
        filterCount: normalizeDataValue(urlState.filterCount, 0),
        category,
        setSearchQuery: urlState.updateSearch,
        setSortBy: urlState.updateSort,
        setFilter: urlState.updateFilter,
        clearFilters: urlState.clearFilters,
        pageData
      }}>
        <ProductUIContext.Provider value={{
          viewMode: normalizeDataValue(uiState.viewMode, 'grid'),
          setViewMode: uiState.setViewMode,
          isTransitioning: normalizeDataValue(uiState.isTransitioning, false),
          showMobileFilters: normalizeDataValue(uiState.showMobileFilters, false),
          setShowMobileFilters: uiState.setShowMobileFilters
        }}>
          {children}
        </ProductUIContext.Provider>
      </ProductFilterContext.Provider>
    </ProductDataContext.Provider>
  );
}