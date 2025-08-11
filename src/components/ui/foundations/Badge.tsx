'use client';

import { twMerge } from 'tailwind-merge';
import { ComponentType } from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  icon?: ComponentType<{ className?: string }>;
  variant?: 'gray' | 'purple' | 'success' | 'warning' | 'error' | 'new' | 'discount' | 'popular' | 'sale' | 'promo';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({ 
  children, 
  icon: Icon, 
  variant = 'gray', 
  size = 'sm',
  className 
}: BadgeProps) {
  const variantStyles = {
    gray: 'bg-gray-100 text-gray-800',
    purple: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    new: 'bg-green-500 text-white',
    discount: 'bg-red-500 text-white',
    popular: 'bg-purple-600 text-white',
    sale: 'bg-red-500 text-white',
    promo: 'bg-purple-800 bg-opacity-80 text-white'
  };

  const sizeClasses = {
    xs: 'text-[11px] px-2 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  // Handle icon-only badge (for NewsletterSection)
  if (Icon && !children) {
    return (
      <div className={twMerge(
        'inline-flex items-center justify-center rounded-full',
        className
      )}>
        <Icon className="w-full h-full" />
      </div>
    );
  }

  return (
    <span
      className={twMerge(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        variantStyles[variant],
        className
      )}
    >
      {/* Support PromoTag style with dot */}
      {variant === 'promo' && (
        <span className="w-2 h-2 rounded-full mr-2 bg-yellow-400" />
      )}
      {Icon && <Icon className="w-4 h-4 mr-1" />}
      {children}
    </span>
  );
}