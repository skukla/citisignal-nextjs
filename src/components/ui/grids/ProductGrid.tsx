'use client';

import Grid from './Grid';
import ProductCard, { 
  ProductCardImage, 
  ProductCardBadges, 
  ProductCardInfo, 
  ProductCardPrice,
  ProductCardColors,
  ProductCardActions 
} from '@/components/ui/cards/ProductCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import type { ProductType } from '@/components/ui/cards/ProductCard/ProductCard.types';
import type { GridGap, ResponsiveValue } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

interface ProductGridProps {
  products: ProductType[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
  children?: React.ReactNode; // For custom ProductCard children
  emptyState?: {
    icon?: HeroIcon;
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };
}

/**
 * A grid component for displaying product cards in a responsive layout.
 * Built on the base Grid component with compound ProductCard pattern.
 * Handles empty state display when no products are available.
 *
 * @example
 * ```tsx
 * // Default usage with empty state
 * <ProductGrid
 *   products={products}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="md"
 *   emptyState={{
 *     title: "No products found",
 *     actionLabel: "Clear filters",
 *     onAction: clearFilters
 *   }}
 * />
 * 
 * // Custom product card structure
 * <ProductGrid products={products}>
 *   <ProductCardImage />
 *   <ProductCardInfo />
 *   <ProductCardPrice />
 * </ProductGrid>
 * ```
 */
export default function ProductGrid({
  products,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'md',
  className,
  children,
  emptyState
}: ProductGridProps) {
  if (products.length === 0) {
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

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {products.map((product) => (
        <ProductCard.Root key={product.sku} product={product}>
          {children || (
            <>
              <ProductCardImage />
              <ProductCardBadges />
              <ProductCardInfo />
              <ProductCardColors />
              <ProductCardPrice />
              <ProductCardActions />
            </>
          )}
        </ProductCard.Root>
      ))}
    </Grid>
  );
}