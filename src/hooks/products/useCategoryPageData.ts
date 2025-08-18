import useSWR from 'swr';
import { graphqlFetcher } from '@/lib/graphql-fetcher';
import { graphqlFetcherWithTracking } from '@/lib/graphql-fetcher-with-tracking';

interface Citisignal_FilterInput {
  attribute?: string;
  in?: string[];
  eq?: string;
  range?: {
    from?: number;
    to?: number;
  };
}

interface Citisignal_SortInput {
  attribute?: string;
  direction?: 'ASC' | 'DESC';
}

const GET_CATEGORY_PAGE_DATA = `
  query GetCategoryPageData(
    $category: String
    $phrase: String
    $filter: [Citisignal_FilterInput]
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
        totalCount
        hasMoreItems
        currentPage
        page_info {
          current_page
          page_size
          total_pages
        }
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
      categoryInfo {
        id
        name
        urlKey
        description
        metaTitle
        metaDescription
      }
    }
  }
`;

interface CategoryPageDataVariables {
  category?: string;
  phrase?: string;
  filter?: Citisignal_FilterInput[];
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
      items: any[];
      totalCount: number;
      hasMoreItems: boolean;
      currentPage: number;
      page_info: {
        current_page: number;
        page_size: number;
        total_pages: number;
      };
      facets: any[];
    };
    facets: {
      facets: any[];
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
 * Hook for fetching complete category page data for SSR.
 * 
 * This hook is optimized for server-side rendering where we need all
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
      dedupingInterval: 60000, // Cache for 1 minute (SSR data is relatively stable)
    }
  );
}

/**
 * Server-side data fetching function for Next.js SSR/SSG.
 * Use this in getServerSideProps or getStaticProps.
 * 
 * @param variables Query variables for the category page
 * @returns Promise with category page data
 */
export async function fetchCategoryPageData(variables: CategoryPageDataVariables): Promise<CategoryPageDataResponse> {
  return graphqlFetcher(GET_CATEGORY_PAGE_DATA, variables);
}