/**
 * Demo Inspector Adapter — Public API
 *
 * Thin adapter layer between the universal demo-inspector custom element
 * and the NextJS storefront's React components.
 *
 * The universal inspector (loaded via <Script>) registers <demo-inspector>
 * and sets up window globals. This adapter provides React-friendly hooks
 * that communicate with the inspector through DOM attributes and globals.
 */

// Hook exports (React adapter for DOM attribute tagging)
export { useDataSource } from './hooks/useInspectorTracking';

// Utility exports (GraphQL tracking via window globals)
export { createGraphQLFetcherWithTracking, type TrackingOptions } from './lib/graphql-tracking';
