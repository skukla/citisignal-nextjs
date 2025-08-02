/**
 * FilterSidebarActiveFilters component
 * Displays active filter tags with individual removal capability
 */

import { memo, useCallback } from 'react';
import type { ActiveFilterEntry } from '@/lib/filter';

interface FilterSidebarActiveFiltersProps {
  activeFilterEntries: ActiveFilterEntry[];
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

function FilterSidebarActiveFilters({
  activeFilterEntries,
  onFilterChange
}: FilterSidebarActiveFiltersProps) {
  const handleRemoveFilter = useCallback((filterKey: string, optionId: string) => {
    onFilterChange(filterKey, optionId, false);
  }, [onFilterChange]);
  if (activeFilterEntries.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
      <div className="space-y-2">
        {activeFilterEntries.map(({ filterKey, optionId, option }) => (
          <div
            key={`${filterKey}-${optionId}`}
            className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full"
          >
            <span className="text-sm text-blue-800">{option.name}</span>
            <button
              onClick={() => handleRemoveFilter(filterKey, optionId)}
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(FilterSidebarActiveFilters);