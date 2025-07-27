'use client';

import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';
import type { 
  ThemeSize, 
  ThemeTextColor, 
  InputVariant 
} from '@/types/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Icon props
  leftIcon?: ComponentType<{ className?: string }>;
  rightIcon?: ComponentType<{ className?: string }>;
  iconColor?: ThemeTextColor;
  
  // Style props
  inputSize?: ThemeSize;
  variant?: InputVariant;
  textColor?: ThemeTextColor;
  placeholderColor?: ThemeTextColor;
  
  // Container props
  containerClassName?: string;
}

export default function Input({
  // Icon props
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconColor = 'text-gray-400',
  
  // Style props
  inputSize = 'md',
  variant = 'default',
  textColor = 'text-gray-900',
  placeholderColor = 'text-gray-400',
  
  // Container props
  containerClassName,
  
  // Standard input props
  className,
  disabled,
  ...props
}: InputProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconPositions = {
    sm: { left: 'left-2', right: 'right-2' },
    md: { left: 'left-3', right: 'right-3' },
    lg: { left: 'left-4', right: 'right-4' }
  };

  const iconPadding = {
    sm: { left: 'pl-8', right: 'pr-8' },
    md: { left: 'pl-10', right: 'pr-10' },
    lg: { left: 'pl-12', right: 'pr-12' }
  };
  
  // Variant styles
  const variantStyles = {
    default: twMerge(
      'border-2 border-gray-300',
      'bg-white',
      'focus:ring-4 focus:ring-purple-400/50 focus:border-purple-500',
      'shadow-sm'
    ),
    newsletter: twMerge(
      'border-0',
      'bg-white',
      'focus:ring-4 focus:ring-yellow-400',
      'shadow-lg'
    )
  };
  
  // State styles
  const stateStyles = {
    disabled: 'opacity-50 cursor-not-allowed bg-gray-100'
  };
  
  // Combine all styles
  const inputStyles = twMerge(
    // Base
    'w-full rounded-lg focus:outline-none transition-all duration-200',
    
    // Size
    sizeClasses[inputSize],
    
    // Colors
    textColor,
    `placeholder:${placeholderColor}`,
    
    // Variant
    variantStyles[variant],
    
    // Icon padding
    LeftIcon && iconPadding[inputSize].left,
    RightIcon && iconPadding[inputSize].right,
    
    // State
    disabled && stateStyles.disabled,
    
    // Custom
    className
  );
  
  return (
    <div className={twMerge('relative', containerClassName)}>
      {LeftIcon && (
        <div className={twMerge(
          'absolute top-1/2 transform -translate-y-1/2',
          iconPositions[inputSize].left
        )}>
          <LeftIcon className={twMerge(iconSizes[inputSize], iconColor)} />
        </div>
      )}
      
      <input
        disabled={disabled}
        className={inputStyles}
        {...props}
      />
      
      {RightIcon && (
        <div className={twMerge(
          'absolute top-1/2 transform -translate-y-1/2',
          iconPositions[inputSize].right
        )}>
          <RightIcon className={twMerge(iconSizes[inputSize], iconColor)} />
        </div>
      )}
    </div>
  );
} 