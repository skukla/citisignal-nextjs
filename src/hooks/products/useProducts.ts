import { useQuery, DocumentNode, ApolloError } from '@apollo/client';

export interface ProductQueryResult<T> {
  items: T[];
  loading: boolean;
  error?: ApolloError;
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
}

/**
 * Generic hook for fetching and transforming product data from Adobe Commerce
 * @template T - The product type (Phone, Watch, Accessory, etc.)
 */
export function useProducts<T>({
  query,
  variables = {},
  transform,
  skip = false
}: UseProductsOptions<T>): ProductQueryResult<T> {
  const { data, loading, error, fetchMore, refetch } = useQuery(query, {
    variables,
    skip,
    errorPolicy: 'all'
  });

  // Extract data from the response
  const searchResult = data?.Catalog_productSearch;
  const rawItems = searchResult?.items || [];
  const totalCount = searchResult?.total_count || 0;
  const pageInfo = searchResult?.page_info;

  // Transform items with error handling
  const items: T[] = rawItems
    .map((item: any) => {
      try {
        // Pass the entire item which includes productView
        return transform(item);
      } catch (err) {
        // Silently skip items that fail transformation
        return null;
      }
    })
    .filter(Boolean);

  // Create loadMore function for pagination
  const loadMore = pageInfo && pageInfo.current_page < pageInfo.total_pages
    ? () => {
        return fetchMore({
          variables: {
            ...variables,
            currentPage: pageInfo.current_page + 1,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            
            return {
              ...prev,
              Catalog_productSearch: {
                ...prev.Catalog_productSearch,
                items: [
                  ...prev.Catalog_productSearch.items,
                  ...fetchMoreResult.Catalog_productSearch.items
                ],
                page_info: fetchMoreResult.Catalog_productSearch.page_info
              }
            };
          }
        });
      }
    : undefined;

  return {
    items,
    loading,
    error,
    totalCount,
    pageInfo,
    loadMore,
    refetch
  };
}