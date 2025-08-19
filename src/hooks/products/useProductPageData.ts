import { useEffect } from 'react';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { useProductCards } from './useProductCards';
import { useProductFacets } from './useProductFacets';
import { useCategoryPageData } from './useCategoryPageData';
import { normalizeProducts } from '@/utils/products';
import type { BaseProduct } from '@/types/commerce';

interface UseProductPageDataOptions {
  category?: string;
  search?: string;
  filters?: Record<string, string | string[] | number | boolean | undefined>;
  sort?: {
    attribute: string;
    direction: 'ASC' | 'DESC';
  };
  limit?: number;
  hasActiveFilters?: boolean;
  initialData?: any;
}

interface ProductPageData {
  products: BaseProduct[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  hasMore: boolean;
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
  loadMore: () => void;
}

/**
 * Orchestrates product page data fetching based on mode and state
 * Handles the complexity of single vs multiple query modes
 */
export function useProductPageData({
  category,
  initialData,
  search,
  filters,
  sort,
  limit = 12,
  hasActiveFilters = false
}: UseProductPageDataOptions): ProductPageData {
  const { singleQueryMode } = useDemoInspector();
  const { setNavigation, setBreadcrumbs, setIsLoadingFromUnified } = useNavigation();
  
  // Extract initial SSR data if provided
  const ssrProducts = initialData?.Citisignal_categoryPageData?.products;
  const ssrFacets = initialData?.Citisignal_categoryPageData?.facets;
  
  // Determine query mode
  const shouldUseSingleQuery = singleQueryMode && !initialData && !hasActiveFilters && !search;
  const shouldUseMultipleQueries = !singleQueryMode && !initialData;
  // When neither single nor multiple query mode, we still need to fetch products
  const shouldFetchSomehow = !shouldUseSingleQuery && category;
  
  // Single query mode - unified data
  const unifiedData = useCategoryPageData(
    shouldUseSingleQuery && category ? {
      category,
      phrase: search,
      filter: filters,
      sort,
      pageSize: limit,
      currentPage: 1
    } : null
  );
  
  // Set loading state for single query mode
  useEffect(() => {
    if (shouldUseSingleQuery) {
      setIsLoadingFromUnified(true);
    }
  }, [shouldUseSingleQuery, setIsLoadingFromUnified]);
  
  // Update navigation context from unified data
  useEffect(() => {
    if (unifiedData.data?.Citisignal_categoryPageData?.navigation) {
      setNavigation(unifiedData.data.Citisignal_categoryPageData.navigation, 'unified');
      setIsLoadingFromUnified(false);
    }
    if (unifiedData.data?.Citisignal_categoryPageData?.breadcrumbs) {
      setBreadcrumbs(unifiedData.data.Citisignal_categoryPageData.breadcrumbs);
    }
  }, [unifiedData.data, setNavigation, setBreadcrumbs, setIsLoadingFromUnified]);
  
  // Multiple query mode - focused queries
  // Always fetch products when we have a category and are not in single query mode
  const shouldFetchProducts = shouldFetchSomehow;
  
  const productData = useProductCards(
    shouldFetchProducts ? {
      phrase: search,
      filter: {
        category,
        ...filters
      },
      sort,
      limit,
      facets: hasActiveFilters || !!search
    } : null
  );
  
  // Always fetch facets when we have a category and are not in single query mode
  // Important: Don't pass active filters to facets query - we want all available options
  const shouldFetchFacets = shouldFetchSomehow;
  const facetsData = useProductFacets(
    shouldFetchFacets ? {
      phrase: search,
      filter: { category }  // Only pass category, not active filters
    } : null
  );
  
  // Merge data based on mode
  if (shouldUseSingleQuery && unifiedData.data) {
    const pageData = unifiedData.data.Citisignal_categoryPageData;
    return {
      products: normalizeProducts(pageData?.products?.items || []),
      loading: unifiedData.isLoading,
      error: unifiedData.error,
      totalCount: pageData?.products?.totalCount || 0,
      hasMore: pageData?.products?.hasMoreItems || false,
      facets: pageData?.facets?.facets || [],
      loadMore: () => {} // Single query doesn't support pagination yet
    };
  }
  
  if (hasActiveFilters || search) {
    return {
      products: productData.items,
      loading: productData.loading,
      error: productData.error,
      totalCount: productData.totalCount,
      hasMore: productData.hasMoreItems,
      facets: facetsData.facets || productData.facets || [],
      loadMore: productData.loadMore
    };
  }
  
  if (ssrProducts) {
    return {
      products: normalizeProducts(ssrProducts.items),
      loading: false,
      error: null,
      totalCount: ssrProducts.totalCount,
      hasMore: ssrProducts.hasMoreItems,
      facets: ssrFacets?.facets || [],
      loadMore: () => {} // SSR doesn't support client-side pagination
    };
  }
  
  // Default to multiple queries
  return {
    products: productData.items,
    loading: productData.loading,
    error: productData.error,
    totalCount: productData.totalCount,
    hasMore: productData.hasMoreItems,
    facets: facetsData.facets || [],
    loadMore: productData.loadMore
  };
}