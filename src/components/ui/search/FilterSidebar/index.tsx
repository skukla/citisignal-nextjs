/**
 * FilterSidebar compound component
 * Main orchestrator for filter sidebar functionality using compound component pattern
 */

'use client';

import { useMemo, useCallback, memo } from 'react';
import { useExpandableSections } from '@/hooks/useExpandableSections';
import { hasActiveFilters, getActiveFilterEntries, initializeExpandedSections } from '@/lib/filter';
import { useActiveProductService } from '@/hooks/products/useActiveProductService';
import type { FilterSidebarProps } from './FilterSidebar.types';
import FilterSidebarHeader from './FilterSidebarHeader';
import FilterSidebarSection from './FilterSidebarSection';
import FilterSidebarActiveFilters from './FilterSidebarActiveFilters';

/**
 * FilterSidebar main component with compound architecture
 * Provides a complete filtering interface with expandable sections and active filter management
 * Uses dynamic source attribution based on service context (catalog for browsing, search for searching)
 *
 * @param filters Array of filter sections to display
 * @param activeFilters Current filter selections
 * @param onFilterChange Callback when filter selection changes
 * @param onClearFilters Callback to clear all filters
 */
function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  isValidating,
}: FilterSidebarProps) {
  // Initialize expanded sections with business logic
  const initialExpandedSections = useMemo(
    () => initializeExpandedSections(filters, true),
    [filters]
  );

  // Use extracted expandable sections hook
  const { expandedSections, toggleSection } = useExpandableSections({
    initialSections: initialExpandedSections,
  });

  // Memoize toggle section to prevent unnecessary re-renders
  const handleToggleSection = useCallback(
    (key: string) => {
      toggleSection(key);
    },
    [toggleSection]
  );

  // Use extracted business logic for active filters
  const hasFiltersActive = useMemo(() => hasActiveFilters(activeFilters), [activeFilters]);

  // Use extracted business logic for active filter entries
  const activeFilterEntries = useMemo(
    () => getActiveFilterEntries(activeFilters, filters),
    [activeFilters, filters]
  );

  // Hook determines which service provides the facets (dynamic source mapping)
  const dataSource = useActiveProductService();

  return (
    <div
      className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6"
      data-inspector-source={dataSource}
      data-inspector-type="filter-sidebar"
    >
      <FilterSidebarHeader hasActiveFilters={hasFiltersActive} onClearFilters={onClearFilters} />

      <div className="space-y-6">
        {filters.map((section) => (
          <FilterSidebarSection
            key={section.key}
            section={section}
            isExpanded={expandedSections[section.key] ?? true}
            activeFilters={activeFilters}
            onToggleSection={handleToggleSection}
            onFilterChange={onFilterChange}
            isValidating={isValidating}
          />
        ))}
      </div>

      <FilterSidebarActiveFilters
        activeFilterEntries={activeFilterEntries}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

export default memo(FilterSidebar);
