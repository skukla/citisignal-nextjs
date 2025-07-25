'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  className?: string;
}

export default function Select({
  options,
  className,
  ...props
}: SelectProps) {
  const styles = twMerge(
    // Base
    'appearance-none w-full rounded-lg',
    'px-4 py-3 pr-10',
    'focus:outline-none transition-all duration-200',
    'cursor-pointer',
    
    // Default style
    'border-2 border-gray-300',
    'bg-white text-gray-900',
    'focus:ring-4 focus:ring-purple-400/50 focus:border-purple-500',
    'shadow-sm',
    
    // Disabled state
    props.disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
    
    className
  );

  return (
    <div className="relative inline-block w-full">
      <select className={styles} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </div>
  );
} 