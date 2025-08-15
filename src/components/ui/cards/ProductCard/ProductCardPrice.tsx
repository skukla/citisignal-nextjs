import { ProductCardPriceProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { twMerge } from 'tailwind-merge';

export function ProductCardPrice({ className, showSavings }: ProductCardPriceProps) {
  const { product } = useProductCard();
  const { price, originalPrice, discountPercent } = product;

  return (
    <div className={twMerge('px-4 pb-4', className)}>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-gray-900">{price}</p>
        {originalPrice && (
          <p className="text-lg text-gray-500 line-through">{originalPrice}</p>
        )}
      </div>
      {showSavings && discountPercent && (
        <p className="mt-1 text-sm font-medium text-green-600">
          Save {discountPercent}%
        </p>
      )}
    </div>
  );
}
