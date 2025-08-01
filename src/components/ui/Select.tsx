'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import { SelectProps, SelectOption, SelectGroup } from '@/types/form';

/**
 * Select component for choosing from a list of options.
 * Supports option groups, placeholder, and clearable selection.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 * />
 * 
 * // With groups
 * <Select
 *   options={[
 *     {
 *       label: 'Group 1',
 *       options: [
 *         { value: '1', label: 'Option 1' },
 *         { value: '2', label: 'Option 2' }
 *       ]
 *     }
 *   ]}
 *   placeholder="Select an option"
 * />
 * ```
 */
export default function Select({
  options,
  placeholder,
  clearable,
  containerClassName,
  className,
  ...props
}: SelectProps) {
  const selectClasses = twMerge(
    // Base
    'appearance-none w-full rounded-lg',
    'px-4 py-3 pr-10',
    'focus:outline-none transition-colors',
    'cursor-pointer',
    
    // Default style
    'border-2 border-gray-300',
    'bg-white text-gray-900',
    'focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
    'shadow-sm',
    
    // Disabled state
    props.disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
    
    className
  );

  const containerClasses = twMerge(
    'relative inline-block w-full',
    containerClassName
  );

  return (
    <div className={containerClasses}>
      <select 
        className={selectClasses}
        {...props}
      >
        {(placeholder || clearable) && (
          <option value="">{placeholder || 'Select...'}</option>
        )}
        
        {options.map((item, index) => (
          // Inline type guard - only used once
          'options' in item ? (
            <optgroup key={index} label={item.label}>
              {item.options.map(option => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option 
              key={item.value} 
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </option>
          )
        ))}
      </select>
      
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <ChevronDownIcon className="w-5 h-5" aria-hidden />
      </div>
    </div>
  );
}