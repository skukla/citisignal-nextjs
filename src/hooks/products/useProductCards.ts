import useSWRInfinite from 'swr/infinite';
const useInfiniteQuery = useSWRInfinite; // rename for clarity
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import GET_PRODUCT_CARDS from '@/graphql/queries/GetProductCards.graphql';
import type { BaseProduct } from '@/types/commerce';

export interface ProductCardsResult {
  items: BaseProduct[];
  loading: boolean;
  error?: Error;
  hasMoreItems: boolean;
  loadMore: () => void;
  totalCount: number;
}

interface UseProductCardsOptions {
  phrase?: string;
  filter?: {
    category?: string;
    manufacturer?: string;
    priceMin?: number;
    priceMax?: number;
    inStockOnly?: boolean;
    onSaleOnly?: boolean;
  };
  limit?: number;
}

/**
 * Fetches product cards with infinite loading support.
 * Loads more items when loadMore() is called.
 */
export function useProductCards({
  phrase,
  filter,
  limit = 20
}: UseProductCardsOptions = {}): ProductCardsResult {
  
  // Fetches pages of data sequentially, accumulating results.
  // Each page request receives the previous page's response to determine if more pages exist.
  const { data, error, size, setSize, isLoading } = useInfiniteQuery(
    (pageIndex, previousPageData) => {
      // Stop if previous page was empty
      if (previousPageData && !previousPageData.Citisignal_productCards?.items?.length) {
        return null;
      }
      return { phrase, filter, limit, page: pageIndex + 1 };
    },
    (vars) => graphqlFetcher(GET_PRODUCT_CARDS, vars),
    { revalidateOnFocus: false }
  );

  // Combine all pages into single array
  const allItems = data?.flatMap(page => page?.Citisignal_productCards?.items || []) || [];
  const latestPage = data?.[data.length - 1];
  const hasMoreItems = latestPage?.Citisignal_productCards?.hasMoreItems || false;
  const totalCount = latestPage?.Citisignal_productCards?.totalCount || 0;

  return {
    items: allItems,
    loading: isLoading,
    error,
    hasMoreItems,
    loadMore: () => setSize(size + 1),
    totalCount
  };
}