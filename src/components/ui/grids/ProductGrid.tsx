'use client';

import Grid from './Grid';
import ProductCard, { 
  ProductCardImage, 
  ProductCardBadges, 
  ProductCardInfo, 
  ProductCardPrice, 
  ProductCardActions 
} from '@/components/ui/cards/ProductCard';
import type { ProductType } from '@/components/ui/cards/ProductCard/ProductCard.types';
import type { GridGap, ResponsiveValue } from '@/types/grid';

interface ProductGridProps {
  products: ProductType[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
  children?: React.ReactNode; // For custom ProductCard children
}

/**
 * A grid component for displaying product cards in a responsive layout.
 * Built on the base Grid component with compound ProductCard pattern.
 *
 * @example
 * ```tsx
 * // Default product card structure
 * <ProductGrid
 *   products={products}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap="md"
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
  children
}: ProductGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {products.map((product) => (
        <ProductCard.Root key={product.sku} product={product}>
          {children || (
            <>
              <ProductCardImage />
              <ProductCardBadges />
              <ProductCardInfo />
              <ProductCardPrice />
              <ProductCardActions />
            </>
          )}
        </ProductCard.Root>
      ))}
    </Grid>
  );
}