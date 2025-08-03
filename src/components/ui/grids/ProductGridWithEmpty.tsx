'use client';

import { ReactNode } from 'react';
import EmptyState from '@/components/ui/feedback/EmptyState';
import type { HeroIcon } from '@/types/hero-icons';

export interface ProductGridWithEmptyProps {
  hasResults: boolean;
  children: ReactNode;
  emptyState?: {
    icon?: HeroIcon;
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * Grid wrapper that handles empty state display.
 * Shows children when hasResults is true, otherwise shows EmptyState.
 * 
 * @example
 * <ProductGridWithEmpty 
 *   hasResults={products.length > 0}
 *   emptyState={{ 
 *     title: "No products found",
 *     actionLabel: "Clear filters",
 *     onAction: clearFilters 
 *   }}
 * >
 *   <div className="grid grid-cols-3 gap-6">
 *     {products.map(product => <ProductCard key={product.id} product={product} />)}
 *   </div>
 * </ProductGridWithEmpty>
 */
export default function ProductGridWithEmpty({ 
  hasResults, 
  children, 
  emptyState 
}: ProductGridWithEmptyProps) {
  if (hasResults) {
    return <>{children}</>;
  }

  return (
    <EmptyState
      icon={emptyState?.icon}
      title={emptyState?.title || 'No results found'}
      description={emptyState?.description || 'Try adjusting your search or filter criteria.'}
      actionLabel={emptyState?.actionLabel}
      onAction={emptyState?.onAction}
    />
  );
}