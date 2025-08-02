/**
 * Utility functions for filter-related business logic
 */

import type { FilterOption, FilterSection, ActiveFilterEntry } from '@/components/ui/FilterSidebar/FilterSidebar.types';

/**
 * Check if any filters are currently active
 * @param activeFilters Record of active filter selections
 * @returns True if any filters have selected values
 */
export function hasActiveFilters(activeFilters: Record<string, string[]>): boolean {
  return Object.values(activeFilters).some(values => values.length > 0);
}

/**
 * Find a specific filter option within filter sections
 * @param filters Array of filter sections
 * @param filterKey The key of the filter section
 * @param optionId The ID of the option to find
 * @returns The filter option if found, undefined otherwise
 */
export function findFilterOption(
  filters: FilterSection[], 
  filterKey: string, 
  optionId: string
): FilterOption | undefined {
  const filterSection = filters.find(f => f.key === filterKey);
  return filterSection?.options.find(o => o.id === optionId);
}

/**
 * Get all active filter entries with their option details
 * @param activeFilters Record of active filter selections
 * @param filters Array of filter sections for option lookup
 * @returns Array of active filter entries with option details
 */
export function getActiveFilterEntries(
  activeFilters: Record<string, string[]>,
  filters: FilterSection[]
): ActiveFilterEntry[] {
  const entries: ActiveFilterEntry[] = [];
  
  Object.entries(activeFilters).forEach(([filterKey, values]) => {
    values.forEach((optionId) => {
      const option = findFilterOption(filters, filterKey, optionId);
      if (option) {
        entries.push({ filterKey, optionId, option });
      }
    });
  });
  
  return entries;
}

/**
 * Initialize expanded sections state for all filter sections
 * @param filters Array of filter sections
 * @param defaultExpanded Whether sections should be expanded by default
 * @returns Record mapping filter keys to expanded state
 */
export function initializeExpandedSections(
  filters: FilterSection[], 
  defaultExpanded: boolean = true
): Record<string, boolean> {
  return filters.reduce((acc, filter) => ({ 
    ...acc, 
    [filter.key]: defaultExpanded 
  }), {});
}