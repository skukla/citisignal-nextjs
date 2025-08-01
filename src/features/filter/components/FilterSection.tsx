'use client';

import { twMerge } from 'tailwind-merge';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useFilterContext } from '../hooks/useFilter';
import type { FilterSectionProps } from '../types/filter.types';

export default function FilterSection({
  section,
  className,
  children,
  ...htmlAttributes
}: FilterSectionProps) {
  const { expanded, toggleSection } = useFilterContext();
  const isExpanded = expanded.includes(section.key);

  return (
    <div
      className={twMerge(
        'border-b border-gray-200 pb-6 last:border-b-0',
        className
      )}
      {...htmlAttributes}
    >
      <button
        onClick={() => toggleSection(section.key)}
        className="flex items-center justify-between w-full text-left mb-4"
        aria-expanded={isExpanded}
        aria-controls={`filter-section-${section.key}`}
      >
        <span className="font-medium text-gray-900">{section.title}</span>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500" aria-hidden />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" aria-hidden />
        )}
      </button>

      {isExpanded && (
        <div
          id={`filter-section-${section.key}`}
          className="space-y-3"
          role="group"
          aria-label={`${section.title} options`}
        >
          {children}
        </div>
      )}
    </div>
  );
}