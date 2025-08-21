/**
 * FilterSidebarSection component
 * Displays an expandable filter section with toggle button and filter options
 */

import { memo, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { FilterSidebarSectionProps } from './FilterSidebar.types';
import FilterSidebarOption from './FilterSidebarOption';

function FilterSidebarSection({
  section,
  isExpanded,
  activeFilters,
  onToggleSection,
  onFilterChange,
  isValidating,
}: FilterSidebarSectionProps) {
  const handleToggle = useCallback(() => {
    onToggleSection(section.key);
  }, [onToggleSection, section.key]);
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0 relative transition-all duration-300">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <span className="font-medium text-gray-900">{section.title}</span>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div
          className={`space-y-3 transition-all duration-300 ${isValidating ? 'opacity-50' : ''}`}
        >
          {section.options.map((option) => (
            <FilterSidebarOption
              key={option.id}
              option={option}
              sectionKey={section.key}
              sectionType={section.type}
              isSelected={activeFilters[section.key]?.includes(option.id) || false}
              onFilterChange={onFilterChange}
            />
          ))}
        </div>
      )}

      {isExpanded && isValidating && (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default memo(FilterSidebarSection);
