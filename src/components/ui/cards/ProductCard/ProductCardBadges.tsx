import { ProductCardBadgesProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import Badge from '@/components/ui/foundations/Badge';
import { calculateDiscount } from '@/lib/product';
import { twMerge } from 'tailwind-merge';

export function ProductCardBadges({ className }: ProductCardBadgesProps) {
  const { product } = useProductCard();
  const { isNew, isSale, stock_status, price, original_price } = product;

  return (
    <div className={twMerge('absolute top-8 left-8 flex flex-col gap-1', className)}>
      {isNew && (
        <Badge variant="new" size="xs" className="font-bold">
          NEW
        </Badge>
      )}
      {isSale && original_price && (
        <Badge variant="discount" size="xs" className="font-bold">
          -{calculateDiscount(original_price, price)}%
        </Badge>
      )}
      {stock_status === 'out_of_stock' && (
        <Badge variant="gray" size="xs" className="font-bold bg-gray-500 text-white">
          OUT OF STOCK
        </Badge>
      )}
    </div>
  );
}
