'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';
import type { FilterOption, FilterType } from '@/types/filters';

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  type: FilterType;
  name?: string;
  isExpanded: boolean;
  onToggle: () => void;
  selectedValues: string[];
  onOptionChange: (value: string, checked: boolean) => void;
  titleColor?: ThemeTextColor;
  textColor?: ThemeTextColor;
  countColor?: ThemeTextColor;
  className?: string;
}

export default function FilterSection({
  title,
  options,
  type,
  name,
  isExpanded,
  onToggle,
  selectedValues,
  onOptionChange,
  titleColor = 'text-gray-900',
  textColor = 'text-gray-700',
  countColor = 'text-gray-500',
  className
}: FilterSectionProps) {
  return (
    <div className={twMerge(
      'border-b border-gray-200 pb-6 last:border-b-0',
      className
    )}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <span className={twMerge('font-medium', titleColor)}>
          {title}
        </span>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-3">
          {options.map((option) => (
            <label 
              key={option.id} 
              className="flex items-center cursor-pointer"
            >
              <input
                type={type}
                name={type === 'radio' ? name : undefined}
                checked={selectedValues.includes(option.id)}
                onChange={(e) => onOptionChange(option.id, e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className={twMerge('ml-3 text-sm flex-1', textColor)}>
                {option.name}
              </span>
              {option.count !== undefined && (
                <span className={twMerge('text-sm', countColor)}>
                  ({option.count})
                </span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
} 