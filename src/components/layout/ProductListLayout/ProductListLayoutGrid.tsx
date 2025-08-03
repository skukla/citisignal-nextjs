'use client';

import { ReactNode } from 'react';
import EmptyState from '@/components/ui/EmptyState';
import type { HeroIcon } from '@/types/hero-icons';

export interface ProductListLayoutGridProps {
  children: ReactNode;
  hasResults: boolean;
  emptyState?: {
    icon?: HeroIcon;
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * Grid section for ProductListLayout.
 * Handles product grid display and empty states.
 */
export function ProductListLayoutGrid({ 
  children, 
  hasResults, 
  emptyState 
}: ProductListLayoutGridProps) {
  return (
    <div className="flex-1">
      {hasResults ? (
        children
      ) : (
        <EmptyState
          icon={emptyState?.icon}
          title={emptyState?.title || 'No results found'}
          description={emptyState?.description || 'Try adjusting your search or filter criteria.'}
          actionLabel={emptyState?.actionLabel}
          onAction={emptyState?.onAction}
        />
      )}
    </div>
  );
}