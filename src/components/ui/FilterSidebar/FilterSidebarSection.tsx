/**
 * FilterSidebarSection component
 * Displays an expandable filter section with toggle button and filter options
 */

import { memo, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { FilterSection } from '@/lib/filter';
import FilterSidebarOption from './FilterSidebarOption';

interface FilterSidebarSectionProps {
  section: FilterSection;
  isExpanded: boolean;
  activeFilters: Record<string, string[]>;
  onToggleSection: (key: string) => void;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

function FilterSidebarSection({
  section,
  isExpanded,
  activeFilters,
  onToggleSection,
  onFilterChange
}: FilterSidebarSectionProps) {
  const handleToggle = useCallback(() => {
    onToggleSection(section.key);
  }, [onToggleSection, section.key]);
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
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
        <div className="space-y-3">
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
    </div>
  );
}

export default memo(FilterSidebarSection);