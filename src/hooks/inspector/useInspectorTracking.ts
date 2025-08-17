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
export function useDataSource({ 
  componentName, 
  source, 
  elementRef 
}: UseDataSourceOptions) {
  const { enabled, trackQuery } = useDemoInspector();
  const componentId = useRef(`${componentName}-${Date.now()}`);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Mark the element with data attributes if ref is provided
    if (elementRef?.current) {
      elementRef.current.setAttribute('data-inspector-source', source);
      elementRef.current.setAttribute('data-inspector-component', componentName);
      elementRef.current.setAttribute('data-inspector-id', componentId.current);
    }
    
    // Register component mount
    if (typeof window !== 'undefined') {
      // This could be expanded to track component lifecycle
      console.debug(`[Demo Inspector] Component registered: ${componentName} (${source})`);
    }
    
    return () => {
      // Clean up on unmount
      if (elementRef?.current) {
        elementRef.current.removeAttribute('data-inspector-source');
        elementRef.current.removeAttribute('data-inspector-component');
        elementRef.current.removeAttribute('data-inspector-id');
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
      responseTime
    });
  };
  
  return {
    componentId: componentId.current,
    trackQuery: trackComponentQuery
  };
}