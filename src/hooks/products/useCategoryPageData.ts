import useSWR from 'swr';
import { graphqlFetcher, graphqlFetcherWithTracking } from '@/lib/graphql-fetcher';
import GET_CATEGORY_PAGE_DATA from '@/graphql/queries/GetCategoryPageData.graphql';

interface Citisignal_PageFilter {
  manufacturer?: string;
  memory?: string[];
  color?: string[];
  price?: string[];
  onSaleOnly?: boolean;
}

interface Citisignal_SortInput {
  attribute?: string;
  direction?: 'ASC' | 'DESC';
}

interface CategoryPageDataVariables {
  categoryUrlKey?: string;
  phrase?: string;
  filter?: Citisignal_PageFilter;
  sort?: Citisignal_SortInput;
  pageSize?: number;
  currentPage?: number;
}

interface CategoryPageDataResponse {
  Citisignal_categoryPageData: {
    navigation: {
      headerNav: Array<{ href: string; label: string; category: string }>;
      footerNav: Array<{ href: string; label: string }>;
    };
    products: {
      items: Array<Record<string, unknown>>;
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

/**
 * Hook for fetching complete category page data in a single query.
 *
 * This hook is optimized for initial page loads where we need all
 * page data in a single query. It orchestrates multiple backend services
 * through Adobe API Mesh to deliver:
 * - Navigation (Commerce Core)
 * - Products (Catalog Service or Live Search)
 * - Facets (Live Search)
 * - Breadcrumbs (Commerce Core)
 * - Category Info (Commerce Core)
 *
 * @param variables Query variables for the category page
 * @returns SWR response with complete category page data
 */
export function useCategoryPageData(variables: CategoryPageDataVariables | null) {
  const key = variables ? [GET_CATEGORY_PAGE_DATA, variables] : null;

  // Use tracking fetcher if Demo Inspector might be enabled
  const fetcher = typeof window !== 'undefined' ? graphqlFetcherWithTracking : graphqlFetcher;

  return useSWR<CategoryPageDataResponse>(
    key,
    key ? ([query, vars]) => fetcher(query, vars) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute (initial page data is relatively stable)
    }
  );
}

/**
 * Direct data fetching function for the unified category page query.
 * Can be used for direct data fetching when needed.
 *
 * @param variables Query variables for the category page
 * @returns Promise with category page data
 */
export async function fetchCategoryPageData(
  variables: CategoryPageDataVariables
): Promise<CategoryPageDataResponse> {
  return graphqlFetcher(GET_CATEGORY_PAGE_DATA, variables);
}
