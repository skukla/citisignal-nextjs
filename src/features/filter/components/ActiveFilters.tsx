'use client';

import { twMerge } from 'tailwind-merge';
import type { ActiveFiltersProps } from '../types/filter.types';

export default function ActiveFilters({
  filters,
  activeFilters,
  onRemove,
  className,
  ...htmlAttributes
}: ActiveFiltersProps) {
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

  if (!hasActiveFilters) return null;

  return (
    <div
      className={twMerge(
        'mt-6 pt-6 border-t border-gray-200',
        className
      )}
      role="region"
      aria-label="Active filters"
      {...htmlAttributes}
    >
      <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
      <div className="space-y-2">
        {Object.entries(activeFilters).map(([filterKey, values]) =>
          values.map((value) => {
            const filter = filters.find(f => f.key === filterKey);
            const option = filter?.options.find(o => o.id === value);
            if (!option) return null;

            return (
              <div
                key={`${filterKey}-${value}`}
                className="flex items-center justify-between bg-purple-50 px-3 py-1 rounded-full"
              >
                <span className="text-sm text-purple-800">{option.name}</span>
                <button
                  onClick={() => onRemove(filterKey, value)}
                  className="text-purple-600 hover:text-purple-800 ml-2"
                  aria-label={`Remove ${option.name} filter`}
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}