'use client';

import { useEffect, useRef } from 'react';

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
  dependencies?: unknown[];
}

/**
 * Standalone hook to register a component with the universal Demo Inspector.
 *
 * Sets data-inspector-source and related DOM attributes on the element ref
 * so the <demo-inspector> custom element can scan and highlight sources.
 *
 * No React context dependency — checks for <demo-inspector> in the DOM
 * to determine if the inspector is active.
 */
export function useDataSource({
  componentName,
  source,
  elementRef,
  dynamicSource,
  fieldMappings,
  dependencies = [],
}: UseDataSourceOptions) {
  const componentId = useRef(`${componentName}-${Date.now()}`);

  useEffect(() => {
    // Check if the inspector element exists (indicates inspector is loaded)
    const inspectorEl = document.querySelector('demo-inspector');
    if (!inspectorEl) return;

    const element = elementRef?.current;
    if (!element) return;

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

    return () => {
      element.removeAttribute('data-inspector-source');
      element.removeAttribute('data-inspector-component');
      element.removeAttribute('data-inspector-id');

      const taggedFields = element.querySelectorAll('[data-inspector-field]');
      taggedFields.forEach((fieldElement) => {
        fieldElement.removeAttribute('data-inspector-field-source');
      });
    };
  }, [componentName, source, dynamicSource, fieldMappings, elementRef, ...dependencies]);

  const trackQuery = (queryName?: string, responseTime?: number) => {
    if (typeof window === 'undefined') return;

    const tracker = (
      window as Window & {
        __demoInspectorTrackQuery?: (entry: unknown) => void;
      }
    ).__demoInspectorTrackQuery;

    if (tracker && queryName) {
      tracker({
        id: `${queryName}-${Date.now()}`,
        name: queryName,
        source,
        timestamp: Date.now(),
        componentId: componentId.current,
        responseTime,
      });
    }
  };

  return {
    componentId: componentId.current,
    trackQuery,
  };
}
