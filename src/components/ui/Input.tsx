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
    disabled: 'opacity-50 cursor-not-allowed bg-gray-100'
  };
  
  // Icon padding
  const iconPadding = {
    left: LeftIcon ? 'pl-10' : '',
    right: RightIcon ? 'pr-10' : ''
  };
  
  // Combine all styles
  const inputStyles = twMerge(
    baseStyles,
    variantStyles[variant],
    disabled && stateStyles.disabled,
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
        disabled={disabled}
        className={inputStyles}
        {...props}
      />
      
      {RightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <RightIcon className={iconClassName} />
        </div>
      )}
    </div>
  );
} 