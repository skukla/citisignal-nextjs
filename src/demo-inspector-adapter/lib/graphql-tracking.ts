import { DocumentNode } from 'graphql';
import { print } from 'graphql';

export interface TrackingOptions {
  skipTracking?: boolean;
  source?: 'commerce' | 'catalog' | 'search';
}

type DataSource = 'commerce' | 'catalog' | 'search';

/**
 * Creates a GraphQL fetcher wrapper with Demo Inspector tracking support.
 *
 * Communicates with the universal inspector via window globals
 * (__demoInspectorTrackQuery, __demoInspectorStoreData) set up by
 * the <demo-inspector> custom element's initialization script.
 */
export function createGraphQLFetcherWithTracking<T = unknown>(
  baseFetcher: (
    query: DocumentNode | string,
    variables?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => Promise<T>
) {
  return async (
    query: DocumentNode | string,
    variables?: Record<string, unknown>,
    options?: TrackingOptions & Record<string, unknown>
  ): Promise<T> => {
    const queryString = typeof query === 'string' ? query : print(query);

    const queryNameMatch = queryString.match(/query\s+(\w+)/);
    const queryName = queryNameMatch ? queryNameMatch[1] : 'Anonymous';

    const startTime = performance.now();
    const result = await baseFetcher(query, variables, options);
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
  };
}

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
