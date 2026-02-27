/**
 * GraphQL fetcher with optional Demo Inspector tracking support.
 *
 * When the Chrome extension's page-bridge sets up window.__demoInspectorTrackQuery
 * and window.__demoInspectorStoreData globals, the fetcher will report query
 * metadata for API Mesh source visualization.
 */

import { DocumentNode, print } from 'graphql';
import { detectSource, trackQuery, trackData } from '@demo-inspector/sdk';

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
  const responseTime = Math.round(performance.now() - startTime);

  if (typeof window !== 'undefined' && !options?.skipTracking) {
    const source = options?.source || detectSource(queryName, result);
    const timestamp = Date.now();

    trackQuery({
      id: `${queryName}-${timestamp}`,
      name: queryName,
      source,
      responseTime,
      timestamp,
    });
    trackData({ queryName, source, data: result, timestamp });
  }

  return result;
}

// Backwards compatibility export
export const graphqlFetcherWithTracking = graphqlFetcher;
