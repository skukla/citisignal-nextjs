/**
 * GraphQL fetcher with optional Demo Inspector tracking support.
 *
 * When the Chrome extension's page-bridge sets up window.__demoInspectorTrackQuery
 * and window.__demoInspectorStoreData globals, the fetcher will report query
 * metadata for API Mesh source visualization.
 */

import { DocumentNode, print } from 'graphql';

interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface TrackingOptions {
  skipTracking?: boolean;
  source?: 'commerce' | 'catalog' | 'search';
}

type DataSource = 'commerce' | 'catalog' | 'search';

/**
 * Detect the data source based on query name and response shape.
 * Uses Citisignal_ prefixed field names from the API Mesh schema.
 */
function detectSource(queryName: string, data: unknown): DataSource {
  let source: DataSource = 'commerce';

  if (data && typeof data === 'object') {
    const dataObj = data as Record<string, unknown>;

    if (queryName === 'GetProductDetail' || dataObj.Citisignal_productDetail) {
      source = 'catalog';
    } else if (
      dataObj.Citisignal_productCards ||
      dataObj.products ||
      queryName.includes('ProductCards')
    ) {
      source = 'catalog';
    } else if (dataObj.Citisignal_productPageData || queryName === 'GetProductPageData') {
      source = 'catalog';
    } else if (
      dataObj.Citisignal_productFacets ||
      dataObj.facets ||
      queryName.includes('Facet') ||
      queryName.includes('Search') ||
      queryName.includes('Filter')
    ) {
      source = 'search';
    } else if (
      dataObj.categories ||
      dataObj.storeConfig ||
      dataObj.navigation ||
      dataObj.breadcrumbs ||
      queryName.includes('Navigation') ||
      queryName.includes('Breadcrumb')
    ) {
      source = 'commerce';
    }
  }

  return source;
}

/**
 * Base GraphQL fetcher without tracking
 */
async function baseFetcher<T = unknown>(
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: {
    headers?: Record<string, string>;
  }
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query);

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = (await response.json()) as GraphQLResponse<T>;

  // Handle GraphQL errors but ignore mesh validation errors that don't affect data
  if (json.errors) {
    const realErrors = json.errors.filter((err) => {
      return (
        !err.message?.includes("Unknown type '_Any'") && !err.message?.includes("Field '_entities'")
      );
    });

    if (realErrors.length > 0) {
      throw new Error(realErrors[0].message);
    }
  }

  return json.data as T;
}

/**
 * GraphQL fetcher with Demo Inspector tracking.
 *
 * Reports query metadata to the Chrome extension via window globals
 * when present. Falls through to base fetcher when extension is not active.
 */
export async function graphqlFetcher<T = unknown>(
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: TrackingOptions & { headers?: Record<string, string> }
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query);
  const queryNameMatch = queryString.match(/query\s+(\w+)/);
  const queryName = queryNameMatch ? queryNameMatch[1] : 'Anonymous';

  const startTime = performance.now();
  const result = await baseFetcher<T>(query, variables, options);
  const endTime = performance.now();

  if (typeof window !== 'undefined' && !options?.skipTracking) {
    const source = options?.source || detectSource(queryName, result);

    const demoInspectorStore = (
      window as Window & {
        __demoInspectorStoreData?: (data: unknown) => void;
      }
    ).__demoInspectorStoreData;

    if (demoInspectorStore) {
      demoInspectorStore({
        queryName,
        source,
        data: result,
        timestamp: Date.now(),
      });
    }

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

  return result;
}

// Backwards compatibility export
export const graphqlFetcherWithTracking = graphqlFetcher;
