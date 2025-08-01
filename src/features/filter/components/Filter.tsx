'use client';

import { twMerge } from 'tailwind-merge';
import { useFilter, FilterContext, useFilterContext } from '../hooks/useFilter';
import type {
  FilterComponent,
  FilterRootProps,
  FilterHeaderProps
} from '../types/filter.types';

/**
 * Root component that provides filter context and layout
 */
function FilterRoot({
  activeFilters,
  defaultExpanded,
  expanded,
  onExpandedChange,
  onFilterChange,
  onClearFilters,
  className,
  children,
  ...htmlAttributes
}: FilterRootProps) {
  const filterContext = useFilter({
    defaultExpanded,
    expanded,
    onExpandedChange,
    activeFilters,
    onFilterChange,
    onClearFilters
  });

  return (
    <FilterContext.Provider value={filterContext}>
      <div
        className={twMerge(
          'w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6',
          className
        )}
        {...htmlAttributes}
      >
        {children}
      </div>
    </FilterContext.Provider>
  );
}

/**
 * Header component with title and clear button
 */
function FilterHeader({
  title = 'Filters',
  showClear = true,
  className,
  ...htmlAttributes
}: FilterHeaderProps) {
  const { activeFilters, onClearFilters } = useFilterContext();
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

  return (
    <div
      className={twMerge('flex items-center justify-between mb-6', className)}
      {...htmlAttributes}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {showClear && hasActiveFilters && onClearFilters && (
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

// Import sub-components
import FilterSection from './FilterSection';
import FilterOption from './FilterOption';
import ActiveFilters from './ActiveFilters';

// Compound component structure
const Filter = Object.assign(FilterRoot, {
  Header: FilterHeader,
  Section: FilterSection,
  Option: FilterOption,
  ActiveFilters: ActiveFilters
}) as FilterComponent;

export default Filter;