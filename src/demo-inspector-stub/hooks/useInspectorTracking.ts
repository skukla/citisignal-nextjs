'use client';

/**
 * useDataSource Hook Stub
 *
 * No-op implementation for when demo-inspector is not installed.
 * Components can safely call this hook without any effect.
 */

import { RefObject } from 'react';

type DataSource = 'commerce' | 'catalog' | 'search';

interface FieldMapping {
  [fieldName: string]: DataSource;
}

interface UseDataSourceOptions {
  componentName: string;
  source: DataSource;
  elementRef?: RefObject<HTMLElement | null>;
  dynamicSource?: () => DataSource;
  fieldMappings?: FieldMapping;
  dependencies?: unknown[];
}

/**
 * No-op useDataSource hook - returns stub tracking functions
 * Components using this hook will function normally, just without inspector tracking
 */
export function useDataSource(_options?: UseDataSourceOptions) {
  return {
    componentId: 'stub',
    trackQuery: (_queryName?: string, _responseTime?: number) => {},
  };
}
