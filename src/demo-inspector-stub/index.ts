'use client';

/**
 * Demo Inspector Stub Module
 *
 * No-op implementations for when the demo-inspector-universal submodule
 * is not installed. Matches the adapter's public API.
 *
 * The resolve-demo-inspector.js script configures tsconfig.json to point
 * @/demo-inspector to this stub when the universal module is absent.
 */

// Hook exports (no-op)
export { useDataSource } from './hooks/useInspectorTracking';

// Utility exports (passthrough)
export { createGraphQLFetcherWithTracking, type TrackingOptions } from './lib/graphql-tracking';
