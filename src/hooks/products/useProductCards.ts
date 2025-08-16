import useSWRInfinite from 'swr/infinite';
const useInfiniteQuery = useSWRInfinite; // rename for clarity
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_PRODUCT_CARDS from '@/graphql/queries/GetProductCards.graphql';
import type { BaseProduct } from '@/types/commerce';

export interface Facet {
  attribute: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
    count: number;
  }>;
}

export interface ProductCardsResult {
  items: BaseProduct[];
  loading: boolean;
  error?: Error;
  hasMoreItems: boolean;
  loadMore: () => void;
  totalCount: number;
  facets?: Facet[];
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
  limit?: number;
  facets?: boolean;
}

/**
 * Fetches product cards with infinite loading support.
 * Loads more items when loadMore() is called.
 * Optionally includes facets for dynamic filtering.
 */
export function useProductCards({
  phrase,
  filter,
  limit = 12,
  facets = false
}: UseProductCardsOptions = {}): ProductCardsResult {
  
  // Create a stable key that includes all filter parameters
  // This ensures SWR creates a new cache entry when filters change
  const getKey = (pageIndex: number, previousPageData: any) => {
    // Stop if previous page was empty
    if (previousPageData && !previousPageData.Citisignal_productCards?.items?.length) {
      return null;
    }
    
    // Include all parameters in the key so filter changes create new cache entries
    return ['productCards', phrase, filter, limit, facets, pageIndex + 1];
  };
  
  // Fetches pages of data sequentially, accumulating results.
  const { data, error, size, setSize, isLoading } = useInfiniteQuery(
    getKey,
    (key) => {
      const [, phrase, filter, limit, facets, page] = key;
      return graphqlFetcher(GET_PRODUCT_CARDS, { phrase, filter, limit, page, facets });
    },
    { revalidateOnFocus: false }
  );

  // Combine all pages into single array
  const allItems = data?.flatMap(page => page?.Citisignal_productCards?.items || []) || [];
  const latestPage = data?.[data.length - 1];
  const hasMoreItems = latestPage?.Citisignal_productCards?.hasMoreItems || false;
  const totalCount = latestPage?.Citisignal_productCards?.totalCount || 0;
  const facetData = latestPage?.Citisignal_productCards?.facets || undefined;

  return {
    items: allItems,
    loading: isLoading,
    error,
    hasMoreItems,
    loadMore: () => setSize(size + 1),
    totalCount,
    facets: facetData
  };
}