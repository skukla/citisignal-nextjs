'use client';

import Grid from './Grid';
import ProductCard, {
  ProductCardImage,
  ProductCardBadges,
  ProductCardInfo,
  ProductCardPrice,
  ProductCardColors,
  ProductCardActions,
} from '@/components/ui/cards/ProductCard';
import EmptyState from '@/components/ui/feedback/EmptyState';
import type { ProductType } from '@/components/ui/cards/ProductCard/ProductCard.types';
import type { BaseProduct } from '@/types/commerce';
import type { GridGap, ResponsiveValue } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

interface ProductGridProps {
  products: (ProductType | BaseProduct)[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
  children?: React.ReactNode; // For custom ProductCard children
  priorityImageCount?: number; // Number of images to load with priority (default: 4)
  dataSource?: 'catalog' | 'search'; // Which service is providing the products
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
    lg: 3,
  },
  gap = 'md',
  className,
  children,
  priorityImageCount = 4,
  dataSource = 'catalog',
  emptyState,
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
    <Grid
      columns={columns}
      gap={gap}
      className={className}
      data-inspector-source={dataSource}
      data-inspector-type="product-grid"
      data-inspector-count={products.length}
    >
      {products.map((product, index) => {
        // Load first N images with priority for better LCP
        const shouldPrioritize = index < priorityImageCount;

        return (
          <ProductCard.Root
            key={product.sku || product.id || `product-${index}`}
            product={product}
            dataSource={dataSource}
          >
            {children || (
              <>
                <ProductCardImage priority={shouldPrioritize} />
                <ProductCardBadges />
                <ProductCardInfo />
                <ProductCardColors />
                <ProductCardPrice />
                <ProductCardActions />
              </>
            )}
          </ProductCard.Root>
        );
      })}
    </Grid>
  );
}
