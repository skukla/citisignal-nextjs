'use client';

import { useEffect, useRef } from 'react';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';

type DataSource = 'commerce' | 'catalog' | 'search';

interface UseDataSourceOptions {
  componentName: string;
  source: DataSource;
  elementRef?: React.RefObject<HTMLElement>;
}

/**
 * Hook to register a component with the Demo Inspector
 * Tracks which data source is being used by this component
 */
export function useDataSource({ componentName, source, elementRef }: UseDataSourceOptions) {
  const { enabled, trackQuery } = useDemoInspector();
  const componentId = useRef(`${componentName}-${Date.now()}`);

  useEffect(() => {
    if (!enabled) return;

    // Mark the element with data attributes if ref is provided
    const element = elementRef?.current;
    if (element) {
      element.setAttribute('data-inspector-source', source);
      element.setAttribute('data-inspector-component', componentName);
      element.setAttribute('data-inspector-id', componentId.current);
    }

    // Register component mount
    // Component registration is handled by data attributes

    return () => {
      // Clean up on unmount
      if (element) {
        element.removeAttribute('data-inspector-source');
        element.removeAttribute('data-inspector-component');
        element.removeAttribute('data-inspector-id');
      }
    };
  }, [enabled, componentName, source, elementRef]);

  // Return a function to manually track queries if needed
  const trackComponentQuery = (queryName: string, responseTime?: number) => {
    if (!enabled) return;

    trackQuery({
      id: `${queryName}-${Date.now()}`,
      name: queryName,
      source,
      timestamp: Date.now(),
      componentId: componentId.current,
      responseTime,
    });
  };

  return {
    componentId: componentId.current,
    trackQuery: trackComponentQuery,
  };
}
