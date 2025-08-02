'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ProgressBarProps } from '@/types/progress';

/**
 * Progress bar component for displaying completion or loading status.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ProgressBar label="Loading" value={60} />
 * 
 * // Custom styling
 * <ProgressBar
 *   label="Storage"
 *   value={80}
 *   className="text-blue-600"
 * />
 * 
 * // Large size without value
 * <ProgressBar
 *   label="Progress"
 *   value={45}
 *   size="lg"
 *   showValue={false}
 * />
 * ```
 */
function ProgressBar({
  label,
  value,
  showValue = true,
  size = 'sm',
  className
}: ProgressBarProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={twMerge('space-y-1', className)}>
      <div className="flex justify-between mb-1">
        <span className="text-gray-600">
          {label}
        </span>
        {showValue && (
          <span className="font-semibold text-gray-700">
            {normalizedValue}%
          </span>
        )}
      </div>

      <div className={twMerge(
        'w-full rounded-full bg-gray-200',
        // Size variants - direct conditionals following Button pattern
        size === 'sm' && 'h-2',
        size === 'md' && 'h-3',
        size === 'lg' && 'h-4'
      )}>
        <div
          className="h-full rounded-full bg-purple-600 transition-all duration-300"
          style={{ width: `${normalizedValue}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${normalizedValue}%`}
        />
      </div>
    </div>
  );
}

export default memo(ProgressBar);