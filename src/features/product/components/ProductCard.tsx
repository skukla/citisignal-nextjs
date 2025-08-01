import Link from 'next/link';
import { ProductCardRootProps } from '../types/product.types';
import { ProductCardProvider } from '../context/ProductCardContext';

export function ProductCard({ product, className, children }: ProductCardRootProps) {
  return (
    <ProductCardProvider product={product}>
      <Link
        href={`/products/${product.url_key}`}
        className={`block rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className ?? ''}`}
      >
        {children}
      </Link>
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