'use client';

import { ReactNode } from 'react';
import { ProductDataContext } from './ProductDataContext';
import { ProductFilterContext } from './ProductFilterContext';
import { ProductUIContext } from './ProductUIContext';
import { useProductPageData } from '@/hooks/products/useProductPageData';
import { useProductList } from '../hooks/useProductList';
import { useProductPageParams } from '../hooks/useProductPageParams';
import { usePageLoading } from '../hooks/usePageLoading';
import { normalizeProducts } from '@/utils/products';
import type { PageData } from '../types';

interface CategoryPageSSRData {
  Citisignal_categoryPageData: {
    navigation?: unknown;
    breadcrumbs?: {
      items?: Array<{
        name: string;
        urlPath: string;
      }>;
    };
    categoryInfo?: unknown;
    products?: {
      items: unknown[];
      totalCount: number;
      hasMoreItems: boolean;
    };
    facets?: {
      facets: unknown[];
    };
  };
}

interface Props {
  children: ReactNode;
  category?: string;
  pageData: PageData;
  limit?: number;
  initialData?: CategoryPageSSRData;
}

/**
 * ProductPageProvider - Orchestrates product page state and data
 * 
 * Supports three data fetching modes:
 * 1. SSR mode: With initialData from server
 * 2. Single Query mode: One unified query for all data
 * 3. Multiple Query mode: Separate optimized queries
 */
export function ProductPageProvider({ 
  children, 
  category,
  pageData,
  limit = 12,
  initialData 
}: Props) {
  // URL state management
  const urlState = useProductPageParams();
  
  // Orchestrated data fetching
  const data = useProductPageData({
    category,
    initialData,
    search: urlState.search,
    filters: {
      manufacturer: urlState.manufacturer,
      memory: urlState.memory,
      colors: urlState.colors,
      priceMin: urlState.priceMin,
      priceMax: urlState.priceMax
    },
    sort: urlState.sort,
    limit,
    hasActiveFilters: urlState.hasActiveFilters
  });
  
  // UI state management
  const uiState = useProductList({ 
    products: normalizeProducts(data.products) 
  });
  
  // Coordinated loading state
  const pageLoading = usePageLoading({
    productsLoading: data.loading,
    facetsLoading: false, // Handled in orchestrator
    searchQuery: urlState.search,
    sortBy: urlState.formattedSort
  });
  
  // Enhanced page data with SSR/unified data if available
  const enhancedPageData = initialData ? {
    ...pageData,
    breadcrumbs: initialData.Citisignal_categoryPageData?.breadcrumbs?.items?.map((item) => ({
      name: item.name,
      href: item.urlPath
    })) || pageData.breadcrumbs,
    navigation: initialData.Citisignal_categoryPageData?.navigation,
    categoryInfo: initialData.Citisignal_categoryPageData?.categoryInfo
  } : pageData;
  
  return (
    <ProductDataContext.Provider value={{
      products: data.products,
      loading: data.loading,
      error: data.error,
      totalCount: data.totalCount,
      hasMore: data.hasMore,
      facets: data.facets,
      loadMore: data.loadMore,
      filteredProducts: uiState.displayProducts,
      isInitialLoading: pageLoading
    }}>
      <ProductFilterContext.Provider value={{
        searchQuery: urlState.search || '',
        sortBy: urlState.formattedSort || 'RELEVANCE',
        activeFilters: urlState.activeFilters || {},
        hasActiveFilters: urlState.hasActiveFilters || false,
        filterCount: urlState.filterCount || 0,
        category,
        setSearchQuery: urlState.updateSearch,
        setSortBy: urlState.updateSort,
        setFilter: urlState.updateFilter,
        clearFilters: urlState.clearFilters,
        pageData: enhancedPageData
      }}>
        <ProductUIContext.Provider value={{
          viewMode: uiState.viewMode || 'grid',
          setViewMode: uiState.setViewMode,
          isTransitioning: uiState.isTransitioning || false,
          showMobileFilters: uiState.showMobileFilters || false,
          setShowMobileFilters: uiState.setShowMobileFilters
        }}>
          {children}
        </ProductUIContext.Provider>
      </ProductFilterContext.Provider>
    </ProductDataContext.Provider>
  );
}