import { ProductCardInfoProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { hasManufacturer } from './ProductCard.types';
import { twMerge } from 'tailwind-merge';

export function ProductCardInfo({ className }: ProductCardInfoProps) {
  const { product } = useProductCard();
  const { name } = product;

  return (
    <div className={twMerge('p-4', className)}>
      {/* Manufacturer section - minimum height */}
      <div className="min-h-[20px] mb-1">
        {hasManufacturer(product) && (
          <p className="text-sm text-gray-500 uppercase tracking-wide leading-5">
            {product.manufacturer}
          </p>
        )}
      </div>

      {/* Product title - flexible height up to 3 lines */}
      <div className="min-h-[28px] mb-3">
        {' '}
        {/* At least 1 line, grows naturally up to 3 */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-7 line-clamp-3">
          {name}
        </h3>
      </div>

      {/* Memory section - minimum height */}
      <div className="min-h-[20px]">
        {'memory' in product && product.memory && product.memory.length > 0 && (
          <div className="text-sm text-gray-600 truncate leading-5">
            {product.memory.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
