'use client';

import { twMerge } from 'tailwind-merge';
import type { FilterOptionProps } from '../types/filter.types';

export default function FilterOption({
  option,
  type,
  name,
  checked,
  onChange,
  className,
  ...htmlAttributes
}: FilterOptionProps) {
  return (
    <label
      className={twMerge(
        'flex items-center cursor-pointer group',
        className
      )}
      {...htmlAttributes}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={twMerge(
          'w-4 h-4 border-gray-300 focus:ring-purple-500',
          type === 'checkbox' ? 'rounded text-purple-600' : 'text-purple-600'
        )}
      />
      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
        {option.name}
      </span>
      {option.count !== undefined && (
        <span className="text-sm text-gray-500 group-hover:text-gray-700">
          ({option.count})
        </span>
      )}
    </label>
  );
}