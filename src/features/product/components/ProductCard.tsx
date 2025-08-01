import Link from 'next/link';
import Card from '@/components/ui/Card';
import { ProductCardRootProps } from '../types/product.types';
import { ProductCardProvider } from '../context/ProductCardContext';

/**
 * A compound component for displaying product information.
 * 
 * @example
 * ```tsx
 * <ProductCard product={productData}>
 *   <ProductCard.Image />
 *   <ProductCard.Badges />
 *   <ProductCard.Info />
 *   <ProductCard.Price />
 *   <ProductCard.Actions />
 * </ProductCard>
 * ```
 */
export function ProductCard({ product, className, children }: ProductCardRootProps) {
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

// Re-export compound components
export { ProductCardImage } from './ProductCardImage';
export { ProductCardBadges } from './ProductCardBadges';
export { ProductCardInfo } from './ProductCardInfo';
export { ProductCardPrice } from './ProductCardPrice';
export { ProductCardColors } from './ProductCardColors';
export { ProductCardActions } from './ProductCardActions';