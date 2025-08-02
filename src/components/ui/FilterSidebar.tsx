'use client';

import { useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useExpandableSections } from '@/hooks/useExpandableSections';
import { 
  hasActiveFilters, 
  getActiveFilterEntries, 
  initializeExpandedSections,
  type FilterSection
} from '@/lib/filter';

interface FilterSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasFiltersActive && (
          <button
            onClick={onClearFilters}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {filters.map((section) => (
          <div key={section.key} className="border-b border-gray-200 pb-6 last:border-b-0">
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <span className="font-medium text-gray-900">{section.title}</span>
              {expandedSections[section.key] ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections[section.key] && (
              <div className="space-y-3">
                {section.options.map((option) => (
                  <label key={option.id} className="flex items-center cursor-pointer">
                    <input
                      type={section.type}
                      name={section.type === 'radio' ? section.key : undefined}
                      checked={activeFilters[section.key]?.includes(option.id) || false}
                      onChange={(e) => onFilterChange(section.key, option.id, e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 flex-1">
                      {option.name}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-sm text-gray-500">({option.count})</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Filters Summary */}
      {hasFiltersActive && (
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
                  onClick={() => onFilterChange(filterKey, optionId, false)}
                  className="text-blue-600 hover:text-blue-800 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 