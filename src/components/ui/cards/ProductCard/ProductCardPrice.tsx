import { ProductCardPriceProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { formatPrice } from '@/lib/pricing';
import { twMerge } from 'tailwind-merge';

export function ProductCardPrice({ className, showSavings }: ProductCardPriceProps) {
  const { product } = useProductCard();
  const { price, original_price, currency } = product;

  return (
    <div className={twMerge('px-4 pb-4', className)}>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-gray-900">{formatPrice(price, currency)}</p>
        {original_price && (
          <p className="text-lg text-gray-500 line-through">{formatPrice(original_price, currency)}</p>
        )}
      </div>
      {showSavings && original_price && (
        <p className="mt-1 text-sm font-medium text-green-600">
          Save {formatPrice(original_price - price, currency)}
        </p>
      )}
    </div>
  );
}
