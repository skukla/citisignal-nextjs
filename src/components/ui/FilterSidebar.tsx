'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: true }), {})
  );

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

  return (
    <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
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
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
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
                    className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-blue-800">{option.name}</span>
                    <button
                      onClick={() => onFilterChange(filterKey, value, false)}
                      className="text-blue-600 hover:text-blue-800 ml-2"
                    >
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
} 