import { ProductCardPriceProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { twMerge } from 'tailwind-merge';

export function ProductCardPrice({ className, showSavings }: ProductCardPriceProps) {
  const { product } = useProductCard();
  const { price, originalPrice, discountPercent } = product;

  return (
    <div className={twMerge('px-4 pb-4', className)}>
      {/* Price row - natural height */}
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-gray-900">{price}</p>
        {originalPrice && <p className="text-lg text-gray-500 line-through">{originalPrice}</p>}
      </div>

      {/* Savings row - only shown when present */}
      {showSavings && discountPercent && (
        <div className="mt-1">
          <p className="text-sm font-medium text-green-600">Save {discountPercent}%</p>
        </div>
      )}
    </div>
  );
}
