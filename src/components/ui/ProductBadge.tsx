import { twMerge } from 'tailwind-merge';
import Badge from './Badge';
import { calculateDiscount } from '@/lib/product';

interface ProductBadgeProps {
  variant: 'new' | 'discount' | 'out-of-stock';
  originalPrice?: number;
  price?: number;
}

/**
 * A specialized badge component for displaying product status information.
 * Built on the base Badge component with product-specific styling.
 * 
 * @example
 * ```tsx
 * // New product badge
 * <ProductBadge variant="new" />
 * 
 * // Discount badge with price calculation
 * <ProductBadge 
 *   variant="discount" 
 *   originalPrice={100} 
 *   price={80} 
 * />
 * 
 * // Out of stock badge
 * <ProductBadge variant="out-of-stock" />
 * ```
 */
export default function ProductBadge({ variant, originalPrice, price }: ProductBadgeProps) {
  // Inline content logic - no function-in-component pattern
  let content = '';
  switch (variant) {
    case 'new':
      content = 'NEW';
      break;
    case 'discount':
      if (originalPrice && price) {
        content = `-${calculateDiscount(originalPrice, price)}%`;
      }
      break;
    case 'out-of-stock':
      content = 'OUT OF STOCK';
      break;
  }

  if (!content) return null;

  // Use consistent variant pattern like Button component
  const variantClasses = twMerge(
    'font-bold',
    variant === 'new' && 'bg-green-500 text-white',
    variant === 'discount' && 'bg-red-500 text-white',
    variant === 'out-of-stock' && 'bg-gray-500 text-white'
  );

  return (
    <Badge size="sm" className={variantClasses}>
      {content}
    </Badge>
  );
} 