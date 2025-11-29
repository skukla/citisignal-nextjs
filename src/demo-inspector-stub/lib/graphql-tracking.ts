/**
 * GraphQL Tracking Stub
 *
 * Passthrough implementation for when demo-inspector is not installed.
 * Simply returns the base fetcher unchanged - no tracking overhead.
 */

import { DocumentNode } from 'graphql';

export interface TrackingOptions {
  skipTracking?: boolean;
  source?: 'commerce' | 'catalog' | 'search';
}

/**
 * Passthrough wrapper - returns the fetcher unchanged
 * When demo-inspector is not installed, GraphQL queries execute without tracking
 *
 * Type signature matches the real implementation for compatibility
 */
export function createGraphQLFetcherWithTracking<T = unknown>(
  baseFetcher: (
    query: DocumentNode | string,
    variables?: Record<string, unknown>,
    options?: Record<string, unknown>
  ) => Promise<T>
): (
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: TrackingOptions & Record<string, unknown>
) => Promise<T> {
  // Simply return the base fetcher - no tracking when inspector not installed
  return baseFetcher as (
    query: DocumentNode | string,
    variables?: Record<string, unknown>,
    options?: TrackingOptions & Record<string, unknown>
  ) => Promise<T>;
}
