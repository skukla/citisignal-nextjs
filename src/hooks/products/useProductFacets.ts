import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import { graphqlFetcherWithTracking } from '@/lib/graphql-fetcher-with-tracking';
import GET_PRODUCT_FACETS from '@/graphql/queries/GetProductFacets.graphql';

export interface Facet {
  title: string;
  key: string;
  type: string;
  options: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export interface ProductFacetsResult {
  facets: Facet[];
  totalCount: number;
  loading: boolean;
  error?: Error;
}

interface UseProductFacetsOptions {
  phrase?: string;
  filter?: {
    category?: string;
    manufacturer?: string;
    memory?: string[];
    colors?: string[];
    priceMin?: number;
    priceMax?: number;
    onSaleOnly?: boolean;
  };
}

/**
 * Fetches available facets (filter options) for products.
 * Updates when search phrase or filters change.
 * Separate from product cards for better performance.
 */
export function useProductFacets({
  phrase,
  filter
}: UseProductFacetsOptions = {}): ProductFacetsResult {
  
  // Create a stable key for SWR caching
  const key = ['productFacets', phrase, filter];
  
  // Use tracking fetcher if Demo Inspector might be enabled
  const fetcher = typeof window !== 'undefined' ? graphqlFetcherWithTracking : graphqlFetcher;
  
  const { data, error, isLoading, isValidating } = useSWR(
    key,
    () => fetcher(GET_PRODUCT_FACETS, { phrase, filter }),
    { 
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      keepPreviousData: true  // Keep showing old facets while loading new ones
    }
  );

  // With keepPreviousData, data will contain previous results while loading new ones
  const facetsData = data?.Citisignal_productFacets?.facets;
  
  return {
    facets: facetsData || [],
    totalCount: data?.Citisignal_productFacets?.totalCount || 0,
    loading: isLoading,  // True when loading, regardless of previous data
    isValidating,  // True when fetching, even with existing data
    error
  };
}