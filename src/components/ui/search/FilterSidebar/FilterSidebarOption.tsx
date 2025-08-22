/**
 * FilterSidebarOption component
 * Displays a single filter option with checkbox/radio input, label, and optional count
 */

import { memo, useCallback } from 'react';
import Checkbox from '@/components/ui/foundations/Checkbox';
import type { FilterSidebarOptionProps } from './FilterSidebar.types';

function FilterSidebarOption({
  option,
  sectionKey,
  sectionType,
  isSelected,
  onFilterChange,
}: FilterSidebarOptionProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange(sectionKey, option.id, e.target.checked);
    },
    [onFilterChange, sectionKey, option.id]
  );
  const isDisabled = option.count === 0;

  return (
    <div
      className={`flex items-center transition-opacity duration-200 ${isDisabled ? 'opacity-40' : ''}`}
    >
      <Checkbox
        type={sectionType}
        name={sectionType === 'radio' ? sectionKey : undefined}
        checked={isSelected}
        onChange={handleChange}
        disabled={isDisabled}
        label={option.name}
        containerClassName="flex-1"
      />
      {option.count !== undefined && (
        <span className="text-sm text-gray-500">({option.count})</span>
      )}
    </div>
  );
}

export default memo(FilterSidebarOption);
