/**
 * FilterSidebar compound component
 * Main orchestrator for filter sidebar functionality using compound component pattern
 */

'use client';

import { useMemo } from 'react';
import { useExpandableSections } from '@/hooks/useExpandableSections';
import { 
  hasActiveFilters, 
  getActiveFilterEntries, 
  initializeExpandedSections,
  type FilterSection
} from '@/lib/filter';
import FilterSidebarHeader from './FilterSidebarHeader';
import FilterSidebarSection from './FilterSidebarSection';
import FilterSidebarActiveFilters from './FilterSidebarActiveFilters';

interface FilterSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

/**
 * FilterSidebar main component with compound architecture
 * Provides a complete filtering interface with expandable sections and active filter management
 * 
 * @param filters Array of filter sections to display
 * @param activeFilters Current filter selections
 * @param onFilterChange Callback when filter selection changes
 * @param onClearFilters Callback to clear all filters
 */
export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) {
  // Initialize expanded sections with business logic
  const initialExpandedSections = useMemo(
    () => initializeExpandedSections(filters, true),
    [filters]
  );

  // Use extracted expandable sections hook
  const { expandedSections, toggleSection } = useExpandableSections({
    initialSections: initialExpandedSections
  });

  // Use extracted business logic for active filters
  const hasFiltersActive = useMemo(
    () => hasActiveFilters(activeFilters),
    [activeFilters]
  );

  // Use extracted business logic for active filter entries
  const activeFilterEntries = useMemo(
    () => getActiveFilterEntries(activeFilters, filters),
    [activeFilters, filters]
  );

  return (
    <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6">
      <FilterSidebarHeader
        hasActiveFilters={hasFiltersActive}
        onClearFilters={onClearFilters}
      />

      <div className="space-y-6">
        {filters.map((section) => (
          <FilterSidebarSection
            key={section.key}
            section={section}
            isExpanded={expandedSections[section.key] ?? true}
            activeFilters={activeFilters}
            onToggleSection={toggleSection}
            onFilterChange={onFilterChange}
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