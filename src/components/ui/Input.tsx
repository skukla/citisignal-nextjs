'use client';

import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Icon props
  leftIcon?: ComponentType<{ className?: string }>;
  rightIcon?: ComponentType<{ className?: string }>;
  iconClassName?: string;
  
  // Style variant
  variant?: 'default' | 'newsletter';
  
  // Loading state
  isLoading?: boolean;
  
  // Container props
  containerClassName?: string;
}

export default function Input({
  // Icon props
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconClassName = 'w-5 h-5 text-gray-400',
  
  // Style variant
  variant = 'default',
  
  // Loading state
  isLoading = false,
  
  // Container props
  containerClassName,
  
  // Standard input props
  className,
  disabled,
  ...props
}: InputProps) {
  // Base styles
  const baseStyles = twMerge(
    'w-full rounded-lg',
    'px-4 py-3',
    'focus:outline-none transition-all duration-200'
  );
  
  // Variant styles
  const variantStyles = {
    default: twMerge(
      'border-2 border-gray-300',
      'bg-white text-gray-900 placeholder-gray-400',
      'focus:ring-4 focus:ring-purple-400/50 focus:border-purple-500',
      'shadow-sm'
    ),
    newsletter: twMerge(
      'border-0',
      'bg-white text-gray-900 placeholder-gray-500',
      'focus:ring-4 focus:ring-yellow-400',
      'shadow-lg'
    )
  };
  
  // State styles
  const stateStyles = {
    disabled: 'opacity-50 cursor-not-allowed bg-gray-100',
    loading: 'cursor-wait'
  };
  
  // Icon padding
  const iconPadding = {
    left: LeftIcon ? 'pl-10' : '',
    right: RightIcon || isLoading ? 'pr-10' : ''
  };
  
  // Combine all styles
  const inputStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    disabled && stateStyles.disabled,
    isLoading && stateStyles.loading,
    iconPadding.left,
    iconPadding.right,
    className
  );
  
  return (
    <div className={twMerge('relative', containerClassName)}>
      {LeftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <LeftIcon className={iconClassName} />
        </div>
      )}
      
      <input
        disabled={disabled || isLoading}
        className={inputStyles}
        {...props}
      />
      
      {RightIcon && !isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <RightIcon className={iconClassName} />
        </div>
      )}

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  );
} 