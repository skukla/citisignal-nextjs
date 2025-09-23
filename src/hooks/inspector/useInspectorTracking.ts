'use client';

import { useEffect, useRef } from 'react';
import { useDemoInspector } from '@/contexts/DemoInspectorContext';

type DataSource = 'commerce' | 'catalog' | 'search';

interface FieldMapping {
  [fieldName: string]: DataSource;
}

interface UseDataSourceOptions {
  componentName: string;
  source: DataSource;
  elementRef?: React.RefObject<HTMLElement | null>;
  dynamicSource?: () => DataSource;
  fieldMappings?: FieldMapping;
  dependencies?: unknown[]; // Dependencies to trigger re-evaluation
}

/**
 * Enhanced hook to register a component with the Demo Inspector
 * Supports dynamic source detection and field-level source mappings
 */
export function useDataSource({
  componentName,
  source,
  elementRef,
  dynamicSource,
  fieldMappings,
  dependencies = [],
}: UseDataSourceOptions) {
  const { enabled, trackQuery } = useDemoInspector();
  const componentId = useRef(`${componentName}-${Date.now()}`);

  useEffect(() => {
    if (!enabled) return;

    // Mark the element with data attributes if ref is provided
    const element = elementRef?.current;
    if (element) {
      // Determine current source (dynamic takes precedence)
      const currentSource = dynamicSource ? dynamicSource() : source;

      // Set component-level attributes
      element.setAttribute('data-inspector-source', currentSource);
      element.setAttribute('data-inspector-component', componentName);
      element.setAttribute('data-inspector-id', componentId.current);

      // Set field-level attributes for granular tracking
      if (fieldMappings) {
        Object.entries(fieldMappings).forEach(([fieldName, fieldSource]) => {
          const fieldElements = element.querySelectorAll(`[data-inspector-field="${fieldName}"]`);
          fieldElements.forEach((fieldElement) => {
            fieldElement.setAttribute('data-inspector-source', fieldSource);
            fieldElement.setAttribute('data-inspector-field-source', fieldSource);
          });
        });
      }
    }

    return () => {
      // Clean up on unmount
      if (element) {
        element.removeAttribute('data-inspector-source');
        element.removeAttribute('data-inspector-component');
        element.removeAttribute('data-inspector-id');

        // Clean up field-level attributes
        const fieldElements = element.querySelectorAll('[data-inspector-field]');
        fieldElements.forEach((fieldElement) => {
          fieldElement.removeAttribute('data-inspector-field-source');
        });
      }
    };
  }, [enabled, componentName, source, dynamicSource, fieldMappings, elementRef, ...dependencies]);

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
