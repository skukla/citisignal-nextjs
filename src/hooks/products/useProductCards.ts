import useSWRInfinite from 'swr/infinite';
const useInfiniteQuery = useSWRInfinite; // rename for clarity
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import { graphqlFetcherWithTracking } from '@/lib/graphql-fetcher-with-tracking';
import GET_PRODUCT_CARDS from '@/graphql/queries/GetProductCards.graphql';
import type { BaseProduct } from '@/types/commerce';

export interface ProductCardsResult {
  items: BaseProduct[];
  loading: boolean;
  error?: Error;
  hasMoreItems: boolean;
  loadMore: () => void;
  totalCount: number;
  facets?: any[];  // Can include facets when requested
}

// Sort options that match our GraphQL schema
export type SortAttribute = 'RELEVANCE' | 'PRICE' | 'NAME';
export type SortDirection = 'ASC' | 'DESC';

export interface SortInput {
  attribute: SortAttribute;
  direction: SortDirection;
}

interface UseProductCardsOptions {
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
  sort?: SortInput;
  limit?: number;
  facets?: boolean;  // Whether to include facets in response
}

/**
 * Fetches product cards with infinite loading support.
 * Loads more items when loadMore() is called.
 * Facets are now fetched separately using useProductFacets hook.
 */
export function useProductCards(
  options: UseProductCardsOptions | null = {}
): ProductCardsResult {
  // Extract options or use defaults
  const { phrase, filter, sort, limit = 12, facets } = options || {};
  
  // Create a stable key that includes all filter parameters
  // This ensures SWR creates a new cache entry when filters change
  const getKey = (pageIndex: number, previousPageData: any) => {
    // If options is null, don't fetch
    if (!options) {
      return null;
    }
    
    // Stop if previous page was empty
    if (previousPageData && !previousPageData.Citisignal_productCards?.items?.length) {
      return null;
    }
    
    // Include all parameters in the key so filter changes create new cache entries
    return ['productCards', phrase, filter, sort, limit, pageIndex + 1];
  };
  
  // Fetches pages of data sequentially, accumulating results.
  // Use tracking fetcher if Demo Inspector might be enabled
  const fetcher = typeof window !== 'undefined' ? graphqlFetcherWithTracking : graphqlFetcher;
  
  const { data, error, size, setSize, isLoading } = useInfiniteQuery(
    getKey,
    (key) => {
      const [, phrase, filter, sort, limit, page] = key;
      return fetcher(GET_PRODUCT_CARDS, { phrase, filter, sort, limit, page });
    },
    { revalidateOnFocus: false }
  );

  // Combine all pages into single array
  const allItems = data?.flatMap(page => page?.Citisignal_productCards?.items || []) || [];
  const latestPage = data?.[data.length - 1];
  const hasMoreItems = latestPage?.Citisignal_productCards?.hasMoreItems || false;
  const totalCount = latestPage?.Citisignal_productCards?.totalCount || 0;
  const productFacets = latestPage?.Citisignal_productCards?.facets;

  return {
    items: allItems,
    loading: isLoading,
    error,
    hasMoreItems,
    loadMore: () => setSize(size + 1),
    totalCount,
    facets: productFacets
  };
}