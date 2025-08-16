'use client';

import { ReactNode } from 'react';
import { ProductDataContext } from './ProductDataContext';
import { ProductFilterContext } from './ProductFilterContext';
import { ProductUIContext } from './ProductUIContext';
import { useProductCards } from '@/hooks/products/useProductCards';
import { useProductFacets } from '@/hooks/products/useProductFacets';
import { useProductList } from '../hooks/useProductList';
import { useProductPageParams } from '../hooks/useProductPageParams';
import { usePageLoading } from '../hooks/usePageLoading';
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
  
  // Step 2: Fetch products based on URL state
  const productData = useProductCards({
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
  
  // Step 2b: Fetch facets
  const facetsData = useProductFacets({
    phrase: urlState.search,
    filter: { category }
  });
  
  // Step 3: Manage UI preferences (independent of URL)
  const uiState = useProductList({ 
    products: normalizeProducts(productData.items) 
  });
  
  // Step 4: Single source of truth for page loading state
  const pageLoading = usePageLoading({
    productsLoading: productData.loading,
    facetsLoading: facetsData.loading,
    searchQuery: urlState.search
  });
  
  // Now just provide the data to children
  return (
    <ProductDataContext.Provider value={{
      products: normalizeDataValue(productData.items, []),
      loading: normalizeDataValue(productData.loading, false),
      error: productData.error,
      totalCount: normalizeDataValue(productData.totalCount, 0),
      hasMore: normalizeDataValue(productData.hasMoreItems, false),
      facets: facetsData.facets,
      loadMore: productData.loadMore,
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