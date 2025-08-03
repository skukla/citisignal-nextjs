import { ProductCardBadgesProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import ProductBadge from '@/components/ui/badges/ProductBadge';
import { twMerge } from 'tailwind-merge';

export function ProductCardBadges({ className }: ProductCardBadgesProps) {
  const { product } = useProductCard();
  const { isNew, isSale, stock_status, price, original_price } = product;

  return (
    <div className={twMerge('absolute top-2 left-2 flex flex-col gap-1', className)}>
      {isNew && <ProductBadge variant="new" />}
      {isSale && <ProductBadge variant="discount" price={price} originalPrice={original_price} />}
      {stock_status === 'OUT_OF_STOCK' && <ProductBadge variant="out-of-stock" />}
    </div>
  );
}
