import { ProductCardPriceProps } from '../types/product.types';
import { useProductCard } from '../context/ProductCardContext';
import { formatPrice } from '@/lib/pricing';

export function ProductCardPrice({ className, showSavings }: ProductCardPriceProps) {
  const { product } = useProductCard();
  const { price, original_price, currency } = product;

  return (
    <div className={`p-4 pt-0 ${className ?? ''}`}>
      <p className="text-xl font-bold text-gray-900">{formatPrice(price, currency)}</p>
      {original_price && (
        <p className="text-sm text-gray-500 line-through">{formatPrice(original_price, currency)}</p>
      )}
      {showSavings && original_price && (
        <p className="mt-1 text-sm font-medium text-green-600">
          Save {formatPrice(original_price - price, currency)}
        </p>
      )}
    </div>
  );
}
