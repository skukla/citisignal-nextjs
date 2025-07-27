'use client';

import { twMerge } from 'tailwind-merge';
import useExpandableSections from '@/hooks/useExpandableSections';
import useFilters from '@/hooks/useFilters';
import FilterSection from './FilterSection';
import FilterTag from './FilterTag';
import type { ThemeTextColor } from '@/types/theme';

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

interface FilterSidebarProps {
  filters: FilterSection[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (newFilters: Record<string, string[]>) => void;
  titleColor?: ThemeTextColor;
  textColor?: ThemeTextColor;
  countColor?: ThemeTextColor;
  className?: string;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  titleColor = 'text-gray-900',
  textColor = 'text-gray-700',
  countColor = 'text-gray-500',
  className
}: FilterSidebarProps) {
  const { isExpanded, toggleSection } = useExpandableSections({
    sections: filters.map(filter => filter.key),
    defaultExpanded: true
  });

  const {
    hasActiveFilters,
    getActiveFiltersBySection,
    handleFilterChange,
    handleClearFilters
  } = useFilters({
    filters,
    activeFilters,
    onChange: onFilterChange
  });

  return (
    <div className={twMerge(
      'w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={twMerge('text-lg font-semibold', titleColor)}>
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {filters.map((section) => (
          <FilterSection
            key={section.key}
            title={section.title}
            options={section.options}
            type={section.type}
            name={section.key}
            isExpanded={isExpanded(section.key)}
            onToggle={() => toggleSection(section.key)}
            selectedValues={activeFilters[section.key] || []}
            onOptionChange={(value, checked) => handleFilterChange(section.key, value, checked)}
            titleColor={titleColor}
            textColor={textColor}
            countColor={countColor}
          />
        ))}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className={twMerge('text-sm font-medium mb-3', titleColor)}>
            Active Filters
          </h4>
          <div className="space-y-2">
            {getActiveFiltersBySection().map(({ filterKey, values }) =>
              values.map(({ value, option }) => (
                <FilterTag
                  key={`${filterKey}-${value}`}
                  label={option.name}
                  onRemove={() => handleFilterChange(filterKey, value, false)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 