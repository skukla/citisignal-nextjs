/**
 * FilterSidebarOption component
 * Displays a single filter option with checkbox/radio input, label, and optional count
 */

import { memo, useCallback } from 'react';
import type { FilterOption } from '@/lib/filter';

interface FilterSidebarOptionProps {
  option: FilterOption;
  sectionKey: string;
  sectionType: 'checkbox' | 'radio';
  isSelected: boolean;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
}

function FilterSidebarOption({
  option,
  sectionKey,
  sectionType,
  isSelected,
  onFilterChange
}: FilterSidebarOptionProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(sectionKey, option.id, e.target.checked);
  }, [onFilterChange, sectionKey, option.id]);
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type={sectionType}
        name={sectionType === 'radio' ? sectionKey : undefined}
        checked={isSelected}
        onChange={handleChange}
        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      />
      <span className="ml-3 text-sm text-gray-700 flex-1">
        {option.name}
      </span>
      {option.count !== undefined && (
        <span className="text-sm text-gray-500">({option.count})</span>
      )}
    </label>
  );
}

export default memo(FilterSidebarOption);