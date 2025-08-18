'use client';

import { ReactNode, useEffect } from 'react';
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
      items: BaseProduct[];
      totalCount: number;
      hasMoreItems: boolean;
      currentPage: number;
      page_info: {
        current_page: number;
        page_size: number;
        total_pages: number;
      };
      facets: Array<{
        title: string;
        key: string;
        type: string;
        options: Array<{
          id: string;
          name: string;
          count: number;
        }>;
      }>;
    };
    facets: {
      facets: Array<{
        title: string;
        key: string;
        type: string;
        options: Array<{
          id: string;
          name: string;
          count: number;
        }>;
      }>;
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
 * ProductPageProviderSSR - Enhanced version with SSR and Single Query Mode support
 * 
 * This provider supports three data fetching modes:
 * 1. SSR mode: With initialData, uses pre-fetched SSR data
 * 2. Single Query mode: Uses unified categoryPageData query for initial load
 * 3. Multiple Query mode: Uses individual focused queries (original behavior)
 * 
 * Filter/sort updates always use focused queries for efficiency.
 */
export function ProductPageProviderSSR({ 
  children, 
  category,
  pageData,
  limit = DEFAULT_PRODUCTS_PER_PAGE,
  initialData 
}: Props) {
  // Get single query mode from Demo Inspector
  const { singleQueryMode } = useDemoInspector();
  
  // Get navigation context to populate from unified query
  const { setNavigation, setBreadcrumbs, setIsLoadingFromUnified } = useNavigation();
  
  // Step 1: Get URL state (what the user is filtering/searching for)
  const urlState = useProductPageParams();
  
  // Extract initial data if provided (SSR mode)
  const ssrProducts = initialData?.Citisignal_categoryPageData?.products;
  const ssrFacets = initialData?.Citisignal_categoryPageData?.facets;
  
  // Determine which query mode to use for initial load
  // Use single query mode only for initial load without filters/search
  const shouldUseSingleQuery = singleQueryMode && !initialData && !urlState.hasActiveFilters && !urlState.search;
  const shouldUseMultipleQueries = !singleQueryMode && !initialData;
  
  // Step 2a: Unified query for single query mode (initial load only)
  const unifiedData = useCategoryPageData(
    shouldUseSingleQuery && category ? {
      category,
      phrase: urlState.search || undefined,
      filter: {
        manufacturer: urlState.manufacturer,
        memory: urlState.memory,
        colors: urlState.colors,
        priceMin: urlState.priceMin,
        priceMax: urlState.priceMax
      },
      sort: urlState.sort ? {
        attribute: urlState.sort.attribute,
        direction: urlState.sort.direction
      } : undefined,
      pageSize: limit,
      currentPage: 1
    } : null
  );
  
  // Set loading state when using single query mode
  useEffect(() => {
    if (shouldUseSingleQuery) {
      setIsLoadingFromUnified(true);
    }
  }, [shouldUseSingleQuery, setIsLoadingFromUnified]);
  
  // Update navigation context when unified data arrives
  useEffect(() => {
    if (unifiedData.data?.Citisignal_categoryPageData?.navigation) {
      setNavigation(unifiedData.data.Citisignal_categoryPageData.navigation, 'unified');
      setIsLoadingFromUnified(false);
    }
    if (unifiedData.data?.Citisignal_categoryPageData?.breadcrumbs) {
      setBreadcrumbs(unifiedData.data.Citisignal_categoryPageData.breadcrumbs);
    }
  }, [unifiedData.data, setNavigation, setBreadcrumbs, setIsLoadingFromUnified]);
  
  // Also update from SSR data if available
  useEffect(() => {
    if (initialData?.Citisignal_categoryPageData?.navigation) {
      setNavigation(initialData.Citisignal_categoryPageData.navigation, 'unified');
    }
    if (initialData?.Citisignal_categoryPageData?.breadcrumbs) {
      setBreadcrumbs(initialData.Citisignal_categoryPageData.breadcrumbs);
    }
  }, [initialData, setNavigation, setBreadcrumbs]);
  
  // Step 2b: Fetch products based on URL state
  // Use this for multiple query mode OR when filters/search are active (even in single query mode)
  const shouldFetchProducts = shouldUseMultipleQueries || (urlState.hasActiveFilters || urlState.search);
  
  // Pass null to prevent fetching when using single query mode
  const productData = useProductCards(
    shouldFetchProducts ? {
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
    } : null
  );
  
  // Step 2c: Fetch facets
  // Only fetch facets in multiple query mode (unified query includes facets)
  const facetsData = useProductFacets(
    shouldUseMultipleQueries ? {
      phrase: urlState.search,
      filter: { category }
    } : null
  );
  
  // Step 3: Merge data based on mode
  let products, loading, error, totalCount, hasMore, facets;
  
  if (shouldUseSingleQuery) {
    // Using single query mode
    if (unifiedData.data) {
      // Extract from unified data when available
      const pageData = unifiedData.data.Citisignal_categoryPageData;
      products = pageData?.products?.items || [];
      loading = unifiedData.isLoading;
      error = unifiedData.error;
      totalCount = pageData?.products?.totalCount || 0;
      hasMore = pageData?.products?.hasMoreItems || false;
      facets = pageData?.facets?.facets || [];
    } else {
      // Still loading unified data
      products = [];
      loading = unifiedData.isLoading;
      error = unifiedData.error;
      totalCount = 0;
      hasMore = false;
      facets = [];
    }
  } else if (urlState.hasActiveFilters || urlState.search) {
    // Use focused queries for updates (even in single query mode)
    products = productData.items;
    loading = productData.loading;
    error = productData.error;
    totalCount = productData.totalCount;
    hasMore = productData.hasMoreItems;
    facets = productData.facets || facetsData.facets;
  } else if (ssrProducts) {
    // Use SSR data
    products = ssrProducts.items;
    loading = false;
    error = null;
    totalCount = ssrProducts.totalCount;
    hasMore = ssrProducts.hasMoreItems;
    facets = ssrFacets?.facets;
  } else {
    // Use multiple queries data
    products = productData.items;
    loading = productData.loading;
    error = productData.error;
    totalCount = productData.totalCount;
    hasMore = productData.hasMoreItems;
    facets = facetsData.facets;
  }
  
  // Step 4: Manage UI preferences (independent of URL)
  const uiState = useProductList({ 
    products: normalizeProducts(products || []) 
  });
  
  // Step 5: Single source of truth for page loading state
  const pageLoading = usePageLoading({
    productsLoading: loading || false,
    facetsLoading: shouldUseSingleQuery ? false : facetsData.loading || false,
    searchQuery: urlState.search,
    sortBy: urlState.formattedSort
  });
  
  // Merge SSR/unified navigation data with pageData if available
  const enhancedPageData = (initialData || (shouldUseSingleQuery && unifiedData.data)) ? {
    ...pageData,
    breadcrumbs: (initialData?.Citisignal_categoryPageData || unifiedData.data?.Citisignal_categoryPageData)?.breadcrumbs?.items?.map(item => ({
      label: item.name,
      href: item.urlPath
    })) || pageData.breadcrumbs,
    navigation: (initialData?.Citisignal_categoryPageData || unifiedData.data?.Citisignal_categoryPageData)?.navigation,
    categoryInfo: (initialData?.Citisignal_categoryPageData || unifiedData.data?.Citisignal_categoryPageData)?.categoryInfo
  } : pageData;
  
  // Now just provide the data to children
  return (
    <ProductDataContext.Provider value={{
      products: normalizeDataValue(products, []),
      loading: normalizeDataValue(loading, false),
      error: error,
      totalCount: normalizeDataValue(totalCount, 0),
      hasMore: normalizeDataValue(hasMore, false),
      facets: normalizeDataValue(facets, []),
      loadMore: productData.loadMore || (() => {}),
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