/**
 * FilterSidebarHeader component
 * Displays the filter sidebar title and conditional "Clear All" button
 */

import { memo } from 'react';
import type { FilterSidebarHeaderProps } from '@/types/filters';

function FilterSidebarHeader({
  hasActiveFilters,
  onClearFilters
}: FilterSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

export default memo(FilterSidebarHeader);