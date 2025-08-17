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

// SSR Data Types
interface CategoryPageSSRData {
  Citisignal_categoryPageData: {
    navigation: {
      headerNav: Array<{ href: string; label: string; category: string }>;
      footerNav: Array<{ href: string; label: string }>;
    };
    products: {
      items: any[];
      totalCount: number;
      hasMoreItems: boolean;
      currentPage: number;
      page_info: {
        current_page: number;
        page_size: number;
        total_pages: number;
      };
      facets: any[];
    };
    facets: {
      facets: any[];
    };
    breadcrumbs: {
      items: Array<{ name: string; urlPath: string }>;
    };
    categoryInfo: {
      id?: string;
      name: string;
      urlKey: string;
      description?: string;
      metaTitle?: string;
      metaDescription?: string;
    };
  };
}

interface Props {
  children: ReactNode;
  category?: string;
  pageData: PageData;
  limit?: number;
  initialData?: CategoryPageSSRData; // NEW: SSR data support
}

/**
 * ProductPageProviderSSR - Enhanced version with SSR support
 * 
 * This provider supports both SSR and client-side data fetching:
 * - With initialData: Uses pre-fetched SSR data, then hydrates with client queries
 * - Without initialData: Falls back to original client-side behavior
 * 
 * This allows gradual migration to SSR pattern while maintaining backward compatibility.
 */
export function ProductPageProviderSSR({ 
  children, 
  category,
  pageData,
  limit = DEFAULT_PRODUCTS_PER_PAGE,
  initialData 
}: Props) {
  // Step 1: Get URL state (what the user is filtering/searching for)
  const urlState = useProductPageParams();
  
  // Extract initial data if provided (SSR mode)
  const ssrProducts = initialData?.Citisignal_categoryPageData?.products;
  const ssrFacets = initialData?.Citisignal_categoryPageData?.facets;
  
  // Step 2: Fetch products based on URL state (with SSR fallback)
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
  }, {
    // Use SSR data as fallback for initial render
    fallbackData: ssrProducts ? {
      items: ssrProducts.items,
      totalCount: ssrProducts.totalCount,
      hasMoreItems: ssrProducts.hasMoreItems,
      loading: false,
      error: null,
      loadMore: () => {},
      reset: () => {}
    } : undefined
  });
  
  // Step 2b: Fetch facets (with SSR fallback)
  const facetsData = useProductFacets({
    phrase: urlState.search,
    filter: { category }
  }, {
    // Use SSR facets as fallback
    fallbackData: ssrFacets ? {
      facets: ssrFacets.facets,
      loading: false,
      error: null
    } : undefined
  });
  
  // Step 3: Manage UI preferences (independent of URL)
  const uiState = useProductList({ 
    products: normalizeProducts(productData.items || ssrProducts?.items) 
  });
  
  // Step 4: Single source of truth for page loading state
  // In SSR mode, we start with loading=false since data is pre-fetched
  const pageLoading = usePageLoading({
    productsLoading: initialData ? false : productData.loading,
    facetsLoading: initialData ? false : facetsData.loading,
    searchQuery: urlState.search,
    sortBy: urlState.formattedSort
  });
  
  // Merge SSR navigation data with pageData if available
  const enhancedPageData = initialData ? {
    ...pageData,
    breadcrumbs: initialData.Citisignal_categoryPageData.breadcrumbs?.items?.map(item => ({
      label: item.name,
      href: item.urlPath
    })) || pageData.breadcrumbs,
    navigation: initialData.Citisignal_categoryPageData.navigation,
    categoryInfo: initialData.Citisignal_categoryPageData.categoryInfo
  } : pageData;
  
  // Now just provide the data to children
  return (
    <ProductDataContext.Provider value={{
      products: normalizeDataValue(productData.items || ssrProducts?.items, []),
      loading: normalizeDataValue(productData.loading, false),
      error: productData.error,
      totalCount: normalizeDataValue(productData.totalCount || ssrProducts?.totalCount, 0),
      hasMore: normalizeDataValue(productData.hasMoreItems || ssrProducts?.hasMoreItems, false),
      facets: facetsData.facets || ssrFacets?.facets,
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
        pageData: enhancedPageData
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