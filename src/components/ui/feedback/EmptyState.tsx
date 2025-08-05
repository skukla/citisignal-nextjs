'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import type { HeroIcon } from '@/types/hero-icons';

export interface EmptyStateProps {
  icon?: HeroIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyState component for displaying empty states across product pages.
 * Provides consistent messaging and actions when no results are found.
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   title="No phones found"
 *   description="Try adjusting your search or filter criteria to find what you're looking for."
 *   actionLabel="Clear all filters"
 *   onAction={handleClearFilters}
 * />
 * ```
 */
function EmptyState({
  icon: IconComponent = Bars3Icon,
  title,
  description,
  actionLabel = 'Clear all filters',
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={twMerge('text-center py-12', className)}>
      {/* Icon */}
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-8 h-8 text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 max-w-md mx-auto">
        {description}
      </p>

      {/* Action Button */}
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="md"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default memo(EmptyState);