'use client';

/**
 * Demo Inspector Stub Module
 *
 * This module provides no-op implementations of the demo-inspector API
 * for when the demo-inspector submodule is not installed.
 *
 * Webpack aliases @/demo-inspector to this stub when the real module is absent.
 */

import React, { ReactNode, RefObject } from 'react';

// ============================================================================
// Types (matching real demo-inspector API)
// ============================================================================

type DataSource = 'commerce' | 'catalog' | 'search';

export interface SourceInfo {
  id: DataSource;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface TrackedQuery {
  id: string;
  name: string;
  source: DataSource;
  timestamp: number;
  componentId?: string;
  responseTime?: number;
}

// TrackingOptions is re-exported from ./lib/graphql-tracking

// ============================================================================
// Constants
// ============================================================================

export const DATA_SOURCES: SourceInfo[] = [
  {
    id: 'commerce',
    name: 'Commerce Core',
    color: '#9333ea',
    icon: '🏪',
    description: 'Navigation, categories & store data',
  },
  {
    id: 'catalog',
    name: 'Catalog Service',
    color: '#2563eb',
    icon: '📦',
    description: 'Product listings & inventory',
  },
  {
    id: 'search',
    name: 'Live Search',
    color: '#16a34a',
    icon: '🔍',
    description: 'Search, facets & filtering',
  },
];

// ============================================================================
// Components (no-op implementations)
// ============================================================================

/**
 * No-op DemoInspector component - renders nothing
 */
export function DemoInspector(): null {
  return null;
}

/**
 * No-op DemoInspectorProvider - passes children through unchanged
 */
export function DemoInspectorProvider({ children }: { children: ReactNode }): ReactNode {
  return children;
}

// ============================================================================
// Hooks (no-op implementations)
// ============================================================================

/**
 * No-op useDemoInspector hook - returns disabled state
 */
export function useDemoInspector() {
  return {
    // State (all disabled/empty)
    enabled: false,
    panelCollapsed: true,
    activeSources: new Set<DataSource>(),
    trackedQueries: [] as TrackedQuery[],
    inspectorPosition: 'right' as const,

    // Actions (all no-ops)
    toggleInspector: () => {},
    togglePanelCollapse: () => {},
    setEnabled: () => {},
    setPanelCollapsed: () => {},
    toggleSource: () => {},
    clearSources: () => {},
    trackQuery: () => {},
    clearQueries: () => {},
    setInspectorPosition: () => {},
  };
}

/**
 * No-op useDataSource hook - returns stub tracking functions
 * Accepts options parameter to match real API signature
 */
export function useDataSource(_options?: {
  componentName: string;
  source: 'commerce' | 'catalog' | 'search';
  elementRef?: RefObject<HTMLElement | null>;
  dynamicSource?: () => 'commerce' | 'catalog' | 'search';
  fieldMappings?: Record<string, 'commerce' | 'catalog' | 'search'>;
  dependencies?: unknown[];
}) {
  return {
    componentId: 'stub',
    trackQuery: (_queryName?: string, _responseTime?: number) => {},
  };
}

// ============================================================================
// Utilities (passthrough implementations)
// ============================================================================

// Re-export from the lib submodule for consistency
export { createGraphQLFetcherWithTracking, type TrackingOptions } from './lib/graphql-tracking';
