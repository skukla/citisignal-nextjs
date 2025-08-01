'use client';

import { twMerge } from 'tailwind-merge';
import type { SpinnerProps } from '@/types/ui';

const sizes = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
} as const;

/**
 * A loading spinner component that provides consistent loading indicators across the application.
 * Supports different sizes and maintains accessibility standards.
 *
 * @example
 * <Spinner size="md" aria-label="Loading content" />
 */
export default function Spinner({ 
  size = 'md', 
  className,
  'aria-label': ariaLabel = 'Loading' 
}: SpinnerProps) {
  return (
    <div 
      className={twMerge(
        'border-2 border-t-transparent rounded-full animate-spin',
        sizes[size],
        className
      )}
      aria-label={ariaLabel}
      aria-hidden="true"
      role="progressbar"
    />
  );
} 