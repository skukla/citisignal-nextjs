import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { DocumentNode } from 'graphql';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

export interface ProductQueryResult<T> {
  items: T[];
  loading: boolean;
  error?: Error;
  totalCount: number;
  pageInfo?: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
  loadMore?: () => void;
  refetch?: () => void;
}

interface UseProductsOptions<T> {
  query: DocumentNode;
  variables?: Record<string, any>;
  transform: (item: any) => T;
  skip?: boolean;
  enablePagination?: boolean;
}

/**
 * Generic hook for fetching and transforming product data from Adobe Commerce
 * @template T - The product type (Phone, Watch, Accessory, etc.)
 */
export function useProducts<T>({
  query,
  variables = {},
  transform,
  skip = false,
  enablePagination = false
}: UseProductsOptions<T>): ProductQueryResult<T> {
  
  // Use infinite loading for pagination if enabled
  if (enablePagination && !skip) {
    const getKey = (pageIndex: number, previousPageData: any) => {
      // If we've reached the end, stop
      if (previousPageData && !previousPageData.Catalog_productSearch?.items?.length) return null;
      
      // Return key with updated page number
      return {
        query,
        variables: { ...variables, currentPage: pageIndex + 1 }
      };
    };

    const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite(
      getKey,
      ({ query, variables }) => graphqlFetcher(query, variables),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateFirstPage: false,
      }
    );

    // Flatten all pages of data - handle both Catalog_productSearch and products
    const allItems = data ? data.flatMap(page => 
      page?.Catalog_productSearch?.items || page?.products?.items || []
    ) : [];

    // Get latest page info - handle both response structures
    const latestPage = data?.[data.length - 1];
    const pageInfo = latestPage?.Catalog_productSearch?.page_info || latestPage?.products?.page_info;
    const totalCount = latestPage?.Catalog_productSearch?.total_count || 
                      latestPage?.products?.total || 0;

    // Transform items
    const items: T[] = allItems
      .map((item: any) => {
        try {
          return transform(item);
        } catch (err) {
          return null;
        }
      })
      .filter(Boolean) as T[];

    // Load more function
    const loadMore = pageInfo && pageInfo.current_page < pageInfo.total_pages
      ? () => setSize(size + 1)
      : undefined;

    // If there's an error, don't return stale items
    return {
      items: error ? [] : items,
      loading: isLoading,
      error,
      totalCount: error ? 0 : totalCount,
      pageInfo: error ? undefined : pageInfo,
      loadMore: error ? undefined : loadMore,
      refetch: () => mutate()
    };
  }

  // Simple single page fetch without pagination
  const key = skip ? null : { query, variables };
  
  const { data, error, mutate, isLoading } = useSWR(
    key,
    () => graphqlFetcher(query, variables),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Extract data from the response - handle both Catalog_productSearch and products
  const searchResult = data?.Catalog_productSearch || data?.products;
  const rawItems = searchResult?.items || [];
  const totalCount = searchResult?.total_count || searchResult?.total || 0;
  const pageInfo = searchResult?.page_info;

  // Transform items with error handling
  const items: T[] = rawItems
    .map((item: any) => {
      try {
        return transform(item);
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean) as T[];

  return {
    items,
    loading: isLoading,
    error,
    totalCount,
    pageInfo,
    loadMore: undefined, // No pagination for simple fetch
    refetch: () => mutate()
  };
}