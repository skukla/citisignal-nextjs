'use client';

import { useProductFilters } from '@/components/layout/ProductPage/providers/ProductFilterContext';

/**
 * Hook that determines which API service is currently active for products
 * based on the current search context.
 * 
 * Business Rule: Our hybrid architecture uses different services:
 * - Catalog Service: Initial page loads and browsing (SEO-optimized)
 * - Live Search: When users enter search queries (AI-powered, faceted)
 * 
 * @returns The currently active service identifier ('search' | 'catalog')
 * 
 * @example
 * ```tsx
 * function ProductGrid() {
 *   const activeService = useActiveProductService();
 *   return <div data-inspector-source={activeService}>...</div>;
 * }
 * ```
 */
export function useActiveProductService(): 'search' | 'catalog' {
  const { searchQuery } = useProductFilters();
  
  // Business rule: Search query triggers Live Search service
  return searchQuery ? 'search' : 'catalog';
}

/**
 * Business rule constants for documentation.
 * These define when each service is used in our hybrid architecture.
 */
export const PRODUCT_DATA_SOURCE_RULES = {
  WITH_SEARCH: 'search' as const,    // Live Search handles user searches
  WITHOUT_SEARCH: 'catalog' as const  // Catalog Service handles browsing
} as const;