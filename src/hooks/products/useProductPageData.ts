import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';

interface Citisignal_PageFilter {
  manufacturer?: string;
  memory?: string[];
  colors?: string[];
  priceMin?: number;
  priceMax?: number;
  onSaleOnly?: boolean;
}

interface Citisignal_SortInput {
  attribute?: string;
  direction?: 'ASC' | 'DESC';
}

const GET_PRODUCT_PAGE_DATA = `
  query GetProductPageData(
    $category: String
    $phrase: String
    $filter: Citisignal_PageFilter
    $sort: Citisignal_SortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    Citisignal_productPageData(
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
  category?: string;  // Optional for product page
  phrase?: string;
  filter?: Citisignal_PageFilter;
  sort?: Citisignal_SortInput;
  pageSize?: number;
  currentPage?: number;
}

interface ProductPageDataResponse {
  Citisignal_productPageData: {
    navigation: {
      headerNav: Array<{ href: string; label: string; category: string }>;
      footerNav: Array<{ href: string; label: string }>;
    };
    products: any;
    facets: any;
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
  const key = variables ? [GET_PRODUCT_PAGE_DATA, variables] : null;
  
  return useSWR<ProductPageDataResponse>(
    key,
    ([query, vars]) => graphqlFetcher(query, vars),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000,
    }
  );
}

/**
 * Alternative hook that demonstrates using the unified query for just navigation.
 * Shows how the same unified endpoint can be used for partial data needs.
 */
export function useUnifiedNavigation() {
  return useProductPageData({
    pageSize: 0  // Optimize - don't fetch products when we only need navigation
  });
}