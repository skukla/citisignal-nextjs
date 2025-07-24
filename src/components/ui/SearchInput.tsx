'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'minimal' | 'white';
  color?: 'purple' | 'yellow' | 'blue' | 'light';
  type?: 'text' | 'email';
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onSubmit,
  className = '',
  autoFocus = false,
  variant = 'default',
  color = 'purple',
  type = 'text'
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const baseInputStyles = 'input-base';
  const colorStyles = {
    purple: 'input-purple',
    yellow: 'input-yellow',
    blue: 'input-blue',
    light: 'input-light'
  };

  const variantStyles = {
    default: 'px-4 py-2.5 border border-gray-300 rounded-lg',
    minimal: 'px-3 py-2 bg-gray-100 rounded-md focus:bg-white focus:border',
    white: 'px-4 py-2.5 border-2 border-white rounded-lg bg-white shadow-lg'
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <MagnifyingGlassIcon 
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
            variant === 'minimal' ? 'text-gray-500' : 'text-gray-400'
          }`}
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={clsx(
            baseInputStyles,
            colorStyles[color],
            variantStyles[variant],
            'w-full pl-10 outline-none transition-colors'
          )}
        />
      </div>
    </div>
  );
} 