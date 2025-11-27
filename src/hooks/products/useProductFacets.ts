import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_PRODUCT_FACETS from '@/graphql/queries/GetProductFacets.graphql';

export interface Facet {
  title: string;
  key: string;
  attributeCode: string; // Original Adobe attribute code for filtering
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
  isValidating?: boolean;
}

interface UseProductFacetsOptions {
  phrase?: string;
  filter?: {
    categoryUrlKey?: string;
    facets?: Record<string, string | string[]>; // Dynamic facets
    manufacturer?: string;
    memory?: string[];
    color?: string[];
    price?: string[];
    onSaleOnly?: boolean;
  };
}

/**
 * Fetches available facets (filter options) for products.
 * Updates when search phrase or filters change.
 * Separate from product cards for better performance.
 */
export function useProductFacets(
  options: UseProductFacetsOptions | null = {}
): ProductFacetsResult {
  // Extract options or use defaults
  const { phrase, filter } = options || {};

  // Create a stable key for SWR caching
  // Pass null as key if options is null to prevent fetching
  const key = options ? ['productFacets', phrase, filter] : null;

  const { data, error, isLoading, isValidating } = useSWR(
    key,
    () => graphqlFetcher(GET_PRODUCT_FACETS, { phrase, filter }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      keepPreviousData: true, // Keep showing old facets while loading new ones
    }
  );

  // With keepPreviousData, data will contain previous results while loading new ones
  const facetsData =
    data && typeof data === 'object' && data !== null && 'Citisignal_productFacets' in data
      ? (data as { Citisignal_productFacets?: { facets?: Facet[] } }).Citisignal_productFacets
          ?.facets
      : undefined;

  return {
    facets: facetsData || [],
    totalCount:
      data && typeof data === 'object' && data !== null && 'Citisignal_productFacets' in data
        ? (data as { Citisignal_productFacets?: { totalCount?: number } }).Citisignal_productFacets
            ?.totalCount || 0
        : 0,
    loading: isLoading, // True when loading, regardless of previous data
    error,
    isValidating, // True when fetching, even with existing data
  };
}
