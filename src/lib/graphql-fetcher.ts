/**
 * GraphQL fetcher with Demo Inspector tracking support
 *
 * This module uses the tracking wrapper from the demo-inspector submodule.
 * All tracking logic is maintained in @/demo-inspector/lib/graphql-tracking
 */

import { DocumentNode } from 'graphql';
import { print } from 'graphql';
import {
  createGraphQLFetcherWithTracking,
  TrackingOptions,
} from '@/demo-inspector/lib/graphql-tracking';

interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
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

// Create the tracked fetcher using the wrapper from demo-inspector
const wrappedFetcher = createGraphQLFetcherWithTracking(baseFetcher);

// Export with proper type signature
export async function graphqlFetcher<T = unknown>(
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: TrackingOptions & { headers?: Record<string, string> }
): Promise<T> {
  return wrappedFetcher(
    query,
    variables,
    options as TrackingOptions & Record<string, unknown>
  ) as Promise<T>;
}

// Backwards compatibility export
export const graphqlFetcherWithTracking = graphqlFetcher;
