/**
 * REFERENCE IMPLEMENTATION
 *
 * Not actively used - reference example only.
 * See hooks/products/useProductCards.ts for active pattern.
 */

import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

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

const GET_CATEGORY_PAGE_DATA = `
  query GetCategoryPageData(
    $category: String
    $phrase: String
    $filter: Citisignal_PageFilter
    $sort: Citisignal_SortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    Citisignal_categoryPageData(
      category: $category
      phrase: $phrase
      filter: $filter
      sort: $sort
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      navigation {
        headerNav {
          href
          label
          category
        }
        footerNav {
          href
          label
        }
      }
      products {
        items {
          id
          sku
          name
          urlKey
          price
          originalPrice
          discountPercent
          inStock
          image {
            url
            altText
          }
          memory
          colors {
            name
            hex
          }
          manufacturer
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        aggregations {
          title
          key
          type
          options {
            id
            name
            count
          }
        }
      }
      facets {
        facets {
          title
          key
          type
          options {
            id
            name
            count
          }
        }
      }
      breadcrumbs {
        items {
          name
          urlPath
        }
      }
    }
  }
`;

interface ProductPageDataVariables {
  category?: string;
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
  };
}

/**
 * Unified hook for fetching all product page data in a single query.
 * Demonstrates the power of Adobe API Mesh by orchestrating multiple backend services.
 *
 * This replaces multiple separate queries with ONE unified query that gets:
 * - Navigation (from Commerce Core)
 * - Products (from Live Search + Catalog Service)
 * - Facets (from Live Search)
 * - Breadcrumbs (from Commerce Core)
 *
 * @param variables Query variables for filtering, sorting, and pagination
 * @returns SWR response with unified product page data
 */
export function useProductPageData(variables: ProductPageDataVariables) {
  // Only create key if we have actual variables to query with
  const key =
    variables && Object.keys(variables).length > 0 ? [GET_CATEGORY_PAGE_DATA, variables] : null;

  return useSWR<CategoryPageDataResponse>(key, ([query, vars]) => graphqlFetcher(query, vars), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 5000,
  });
}
