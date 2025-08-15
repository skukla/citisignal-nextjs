import { ProductCardBadgesProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import Badge from '@/components/ui/foundations/Badge';
import { twMerge } from 'tailwind-merge';

export function ProductCardBadges({ className }: ProductCardBadgesProps) {
  const { product } = useProductCard();
  const { inStock, discountPercent } = product;

  return (
    <div className={twMerge('absolute top-8 left-8 flex flex-col gap-1', className)}>
      {discountPercent && (
        <Badge variant="discount" size="xs" className="font-bold">
          -{discountPercent}%
        </Badge>
      )}
      {!inStock && (
        <Badge variant="gray" size="xs" className="font-bold bg-gray-500 text-white">
          OUT OF STOCK
        </Badge>
      )}
    </div>
  );
}
