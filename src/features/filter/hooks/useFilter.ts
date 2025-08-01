'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import type { FilterContextValue, FilterState } from '../types/filter.types';

const FilterContext = createContext<FilterContextValue | null>(null);

interface UseFilterOptions {
  defaultExpanded?: boolean | readonly string[];
  expanded?: readonly string[];
  onExpandedChange?: (expanded: readonly string[]) => void;
  activeFilters: FilterState;
  onFilterChange: (key: string, value: string, checked: boolean) => void;
  onClearFilters?: () => void;
}

export function useFilter({
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  activeFilters,
  onFilterChange,
  onClearFilters
}: UseFilterOptions): FilterContextValue {
  // Handle controlled/uncontrolled expanded state
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState<readonly string[]>(() => {
    if (typeof defaultExpanded === 'boolean') {
      return defaultExpanded ? Object.keys(activeFilters) : [];
    }
    return defaultExpanded || [];
  });

  const expanded = controlledExpanded ?? uncontrolledExpanded;

  const toggleSection = useCallback((key: string) => {
    const newExpanded = expanded.includes(key)
      ? expanded.filter(k => k !== key)
      : [...expanded, key];

    setUncontrolledExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  }, [expanded, onExpandedChange]);

  return {
    expanded,
    toggleSection,
    activeFilters,
    onFilterChange,
    onClearFilters
  };
}

export function useFilterContext(): FilterContextValue {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a Filter.Root component');
  }
  return context;
}

export { FilterContext };