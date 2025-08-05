import Link from 'next/link';
import Card from '@/components/ui/cards/Card';
import { ProductCardRootProps } from './ProductCard.types';
import { ProductCardProvider } from './ProductCardContext';

/**
 * Root component for ProductCard compound component.
 * Provides context and card layout for all ProductCard sub-components.
 * 
 * @example
 * ```tsx
 * <ProductCard.Root product={productData}>
 *   <ProductCard.Image />
 *   <ProductCard.Badges />
 *   <ProductCard.Info />
 *   <ProductCard.Price />
 *   <ProductCard.Actions />
 * </ProductCard.Root>
 * ```
 */
export function ProductCardRoot({ product, className, children }: ProductCardRootProps) {
  return (
    <ProductCardProvider product={product}>
      <Card
        as={Link}
        href={`/products/${product.url_key}`}
        interactive
        className={className}
      >
        {children}
      </Card>
    </ProductCardProvider>
  );
}

