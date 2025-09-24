import { DocumentNode } from 'graphql';
import { print } from 'graphql';

interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Enhanced GraphQL fetcher with built-in tracking support
 *
 * @param query - GraphQL query document or string
 * @param variables - Query variables
 * @param options - Additional options for the fetcher
 * @returns Promise with query data
 */
export async function graphqlFetcher<T = unknown>(
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: {
    skipTracking?: boolean; // Skip tracking for this query
    headers?: Record<string, string>; // Custom headers
  }
): Promise<T> {
  // Convert DocumentNode to string if needed
  const queryString = typeof query === 'string' ? query : print(query);

  // Extract query name for tracking
  const queryNameMatch = queryString.match(/query\s+(\w+)/);
  const queryName = queryNameMatch ? queryNameMatch[1] : 'Anonymous';

  const startTime = performance.now();

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers, // Merge custom headers
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = (await response.json()) as GraphQLResponse<T>;
  const endTime = performance.now();

  // Handle GraphQL errors but ignore mesh validation errors that don't affect data
  if (json.errors) {
    const realErrors = json.errors.filter((err) => {
      // Filter out mesh validation errors that don't prevent data from being returned
      return (
        !err.message?.includes("Unknown type '_Any'") && !err.message?.includes("Field '_entities'")
      );
    });

    if (realErrors.length > 0) {
      throw new Error(realErrors[0].message);
    }
  }

  // Track the query and its data if inspector is available and tracking not skipped
  if (typeof window !== 'undefined' && !options?.skipTracking) {
    // Determine source based on query name and response structure
    let source: 'commerce' | 'catalog' | 'search' = 'commerce';

    // Enhanced source detection with PDP-specific handling
    if (json.data) {
      const data = json.data as Record<string, unknown>;

      // Product Detail queries use complex orchestration
      if (queryName === 'GetProductDetail' || data.Citisignal_productDetail) {
        // Product detail uses multiple sources: primarily catalog, with commerce for variants/breadcrumbs
        source = 'catalog'; // Primary source, will be overridden by component-level tagging
      }
      // Product cards and listings typically come from catalog
      else if (
        data.Citisignal_productCards ||
        data.products ||
        queryName.includes('ProductCards')
      ) {
        source = 'catalog';
      }
      // Unified product page data (multi-service orchestration)
      else if (data.Citisignal_productPageData || queryName === 'GetProductPageData') {
        source = 'catalog'; // Primary source for the unified query
      }
      // Facet/filter queries come from search
      else if (
        data.Citisignal_productFacets ||
        data.facets ||
        queryName.includes('Facet') ||
        queryName.includes('Search') ||
        queryName.includes('Filter')
      ) {
        source = 'search';
      }
      // Navigation, categories, store config, breadcrumbs come from commerce
      else if (
        data.categories ||
        data.storeConfig ||
        data.navigation ||
        data.breadcrumbs ||
        queryName.includes('Navigation') ||
        queryName.includes('Breadcrumb')
      ) {
        source = 'commerce';
      }
    }

    // Store the response data with source attribution
    const demoInspectorStore = (
      window as Window & {
        __demoInspectorStoreData?: (data: unknown) => void;
      }
    ).__demoInspectorStoreData;

    if (demoInspectorStore) {
      demoInspectorStore({
        queryName,
        source,
        data: json.data,
        timestamp: Date.now(),
      });
    }

    // Track the query
    const demoInspectorTrack = (
      window as Window & {
        __demoInspectorTrackQuery?: (query: unknown) => void;
      }
    ).__demoInspectorTrackQuery;

    if (demoInspectorTrack) {
      demoInspectorTrack({
        id: `${queryName}-${Date.now()}`,
        name: queryName,
        source,
        timestamp: Date.now(),
        responseTime: Math.round(endTime - startTime),
      });
    }
  }

  return json.data as T;
}

// Backwards compatibility export
export const graphqlFetcherWithTracking = graphqlFetcher;
