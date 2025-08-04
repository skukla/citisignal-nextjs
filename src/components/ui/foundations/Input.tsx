'use client';

import { ComponentType, InputHTMLAttributes, memo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Input component props extending HTML input attributes
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftIcon?: ComponentType<{ className: string }>;
    rightIcon?: ComponentType<{ className: string }>;
    iconClassName?: string;
    variant?: 'default' | 'newsletter';
    containerClassName?: string;
}

/**
 * Input component for text input with optional icons.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter text..." />
 * 
 * // With left icon
 * <Input 
 *   leftIcon={MagnifyingGlassIcon}
 *   placeholder="Search..."
 * />
 * 
 * // Newsletter variant
 * <Input 
 *   variant="newsletter"
 *   placeholder="Enter email..."
 * />
 * ```
 */
function Input({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconClassName,
  variant = 'default',
  containerClassName,
  className,
  disabled,
  ...props
}: InputProps) {
  const hasLeftIcon = !!LeftIcon;
  const hasRightIcon = !!RightIcon;

  const containerClasses = twMerge(
    'relative w-full',
    variant === 'newsletter' && 'max-w-sm',
    disabled && 'opacity-50',
    containerClassName
  );

  const inputClasses = twMerge(
    // Base styles
    'w-full bg-white rounded-lg transition-all duration-200',
    
    // Variant-specific styles
    variant === 'default' && [
      'border border-gray-300 py-2 px-4',
      'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
      'placeholder:text-gray-400'
    ],
    variant === 'newsletter' && [
      'border-0 shadow-lg py-3 px-4',
      'focus:ring-4 focus:ring-yellow-400 focus:outline-none',
      'placeholder:text-gray-500 text-gray-900'
    ],
    
    // Icon spacing
    hasLeftIcon && 'pl-10',
    hasRightIcon && 'pr-10',
    
    // Disabled state
    disabled && 'cursor-not-allowed',
    
    className
  );

  const iconStyles = twMerge(
    'absolute w-5 h-5 text-gray-400 top-1/2 transform -translate-y-1/2',
    iconClassName
  );

  return (
    <div className={containerClasses}>
      {LeftIcon && (
        <LeftIcon 
          className={twMerge(iconStyles, 'left-3')}
          aria-hidden
        />
      )}
      <input
        {...props}
        disabled={disabled}
        className={inputClasses}
      />
      {RightIcon && (
        <RightIcon 
          className={twMerge(iconStyles, 'right-3')}
          aria-hidden
        />
      )}
    </div>
  );
}

export default memo(Input);