import type { ProductType } from './ProductCard.types';
import { ProductCardProvider } from './ProductCardContext';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardBadges } from './ProductCardBadges';
import { ProductCardInfo } from './ProductCardInfo';
import { ProductCardColors } from './ProductCardColors';
import { ProductCardPrice } from './ProductCardPrice';
import { ProductCardActions } from './ProductCardActions';
import { twMerge } from 'tailwind-merge';

interface ProductCardProps {
  product: ProductType;
  className?: string;
  children?: React.ReactNode;
  // Component visibility controls for customization
  showImage?: boolean;
  showBadges?: boolean;
  showInfo?: boolean;
  showColors?: boolean;
  showPrice?: boolean;
  showActions?: boolean;
}

/**
 * Simplified ProductCard component that renders a complete product card.
 * Much simpler than the compound pattern while still allowing customization.
 *
 * @example
 * // Simple usage (renders everything)
 * <ProductCard product={product} />
 * 
 * // Customize what shows
 * <ProductCard 
 *   product={product} 
 *   showColors={false}
 *   showActions={false}
 * />
 * 
 * // Custom content (advanced)
 * <ProductCard product={product}>
 *   <CustomContent />
 * </ProductCard>
 */
export function ProductCard({ 
  product, 
  className,
  children,
  showImage = true,
  showBadges = true,
  showInfo = true,
  showColors = true,
  showPrice = true,
  showActions = true
}: ProductCardProps) {
  return (
    <ProductCardProvider product={product}>
      <div
        className={twMerge(
          'group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300',
          'hover:shadow-md hover:-translate-y-1',
          className
        )}
      >
        {children || (
          <>
            {showImage && <ProductCardImage />}
            {showBadges && <ProductCardBadges />}
            {showInfo && <ProductCardInfo />}
            {showColors && <ProductCardColors />}
            {showPrice && <ProductCardPrice />}
            {showActions && <ProductCardActions />}
          </>
        )}
      </div>
    </ProductCardProvider>
  );
}

// Keep compound pattern available for advanced use cases
ProductCard.Image = ProductCardImage;
ProductCard.Badges = ProductCardBadges;
ProductCard.Info = ProductCardInfo;
ProductCard.Colors = ProductCardColors;
ProductCard.Price = ProductCardPrice;
ProductCard.Actions = ProductCardActions;