'use client';

import { twMerge } from 'tailwind-merge';
import { ComponentType } from 'react';

interface IconContainerProps {
  icon?: ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
  bgColor?: string;
  className?: string;
}

export default function IconContainer({
  icon: Icon,
  children,
  size = 'md',
  variant = 'default',
  bgColor,
  className
}: IconContainerProps) {
  // Container size classes
  const containerSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  // Background color variants
  const variantBgClasses = {
    default: 'bg-gray-100',
    primary: 'bg-purple-50',
    secondary: 'bg-blue-50',
    accent: 'bg-yellow-50',
    custom: bgColor || 'bg-purple-50'
  };

  // Icon color variants
  const variantIconClasses = {
    default: 'text-gray-600',
    primary: 'text-purple-600',
    secondary: 'text-blue-600',
    accent: 'text-yellow-600',
    custom: ''
  };

  return (
    <div className={twMerge(
      'rounded-lg flex items-center justify-center transition-colors',
      containerSizeClasses[size],
      variantBgClasses[variant],
      'group-hover:bg-purple-100',
      className
    )}>
      {Icon ? (
        <Icon className={twMerge(
          iconSizeClasses[size],
          variantIconClasses[variant]
        )} />
      ) : (
        children
      )}
    </div>
  );
}