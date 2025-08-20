import useSWRInfinite from 'swr/infinite';
const useInfiniteQuery = useSWRInfinite; // rename for clarity
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_PRODUCT_SEARCH_FILTER from '@/graphql/queries/GetProductSearchFilter.graphql';
import type { BaseProduct } from '@/types/commerce';

/**
 * Consolidated hook for product search and filtering
 * Returns both products and facets in a single request
 * Optimizes performance by reducing network calls by 50%
 */

export interface ProductSearchFilterResult {
  // Product data
  items: BaseProduct[];
  loading: boolean;
  error?: Error;
  hasMoreItems: boolean;
  loadMore: () => void;
  totalCount: number;

  // Facet data
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
}

// Sort options that match our GraphQL schema
export type SortAttribute = 'RELEVANCE' | 'PRICE' | 'NAME';
export type SortDirection = 'ASC' | 'DESC';

export interface SortInput {
  attribute: SortAttribute;
  direction: SortDirection;
}

interface UseProductSearchFilterOptions {
  phrase?: string;
  filter?: {
    categoryUrlKey?: string;
    manufacturer?: string;
    memory?: string[];
    colors?: string[];
    priceMin?: number;
    priceMax?: number;
    onSaleOnly?: boolean;
  };
  sort?: SortInput;
  limit?: number;
}

/**
 * Fetches products and facets in a single query.
 * Supports infinite loading for products while keeping facets updated.
 *
 * Benefits:
 * - Single network request instead of two
 * - Products and facets always in sync
 * - Better performance for filter/search operations
 */
export function useProductSearchFilter(
  options: UseProductSearchFilterOptions | null = {}
): ProductSearchFilterResult {
  const { phrase, filter, sort, limit = 12 } = options || {};

  // Create a stable key for SWR caching
  const getKey = (
    pageIndex: number,
    previousPageData: {
      Citisignal_productSearchFilter?: {
        products?: { items?: unknown[] };
      };
    } | null
  ) => {
    // If options is null, don't fetch
    if (!options) {
      return null;
    }

    // Stop if previous page was empty
    if (
      previousPageData &&
      !previousPageData.Citisignal_productSearchFilter?.products?.items?.length
    ) {
      return null;
    }

    // Include all parameters in the key for proper cache invalidation
    return ['productSearchFilter', phrase, filter, sort, limit, pageIndex + 1];
  };

  // Fetch pages of data
  const { data, error, size, setSize, isLoading } = useInfiniteQuery(
    getKey,
    (key) => {
      const [, phrase, filter, sort, limit, page] = key;
      return graphqlFetcher(GET_PRODUCT_SEARCH_FILTER, {
        phrase,
        filter,
        sort,
        limit,
        page,
      });
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
    }
  );

  // Combine all product pages into single array
  const allItems =
    data?.flatMap((page) => page?.Citisignal_productSearchFilter?.products?.items || []) || [];

  // Get latest page data for metadata
  const latestPage = data?.[data.length - 1];
  const searchFilterData = latestPage?.Citisignal_productSearchFilter;

  // Extract products metadata
  const hasMoreItems = searchFilterData?.products?.hasMoreItems || false;
  const totalCount = searchFilterData?.products?.totalCount || 0;

  // Extract facets (always from latest page for most up-to-date options)
  const facets = searchFilterData?.facets?.facets || [];

  return {
    // Product data
    items: allItems,
    loading: isLoading,
    error,
    hasMoreItems,
    loadMore: () => setSize(size + 1),
    totalCount,

    // Facet data
    facets,
  };
}
