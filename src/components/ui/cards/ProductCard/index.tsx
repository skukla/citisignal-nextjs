// ProductCard Compound Component
export { ProductCardRoot } from './ProductCardRoot';
export { ProductCardImage } from './ProductCardImage';
export { ProductCardBadges } from './ProductCardBadges';
export { ProductCardInfo } from './ProductCardInfo';
export { ProductCardPrice } from './ProductCardPrice';
export { ProductCardColors } from './ProductCardColors';
export { ProductCardActions } from './ProductCardActions';

// Compound component namespace
import { ProductCardRoot } from './ProductCardRoot';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardBadges } from './ProductCardBadges';
import { ProductCardInfo } from './ProductCardInfo';
import { ProductCardPrice } from './ProductCardPrice';
import { ProductCardColors } from './ProductCardColors';
import { ProductCardActions } from './ProductCardActions';
import type { ProductCardComponent } from './ProductCard.types';

/**
 * ProductCard compound component for displaying product information.
 * Provides a complete product card interface with image, badges, info, pricing, colors, and actions.
 *
 * @example
 * <ProductCard.Root product={productData}>
 *   <ProductCard.Image />
 *   <ProductCard.Badges />
 *   <ProductCard.Info />
 *   <ProductCard.Price />
 *   <ProductCard.Colors />
 *   <ProductCard.Actions />
 * </ProductCard.Root>
 */
const ProductCard: ProductCardComponent = {
  Root: ProductCardRoot,
  Image: ProductCardImage,
  Badges: ProductCardBadges,
  Info: ProductCardInfo,
  Price: ProductCardPrice,
  Colors: ProductCardColors,
  Actions: ProductCardActions
};

export default ProductCard;

// Context and hooks
export { ProductCardProvider, useProductCard } from './ProductCardContext';
export { useWishlist } from './useWishlist';

// Types
export type * from './ProductCard.types';