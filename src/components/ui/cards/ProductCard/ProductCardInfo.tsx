import { ProductCardInfoProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { hasManufacturer } from './ProductCard.types';
import { twMerge } from 'tailwind-merge';

export function ProductCardInfo({ className }: ProductCardInfoProps) {
  const { product } = useProductCard();
  const { name } = product;

  return (
    <div className={twMerge('p-4', className)}>
      {hasManufacturer(product) && (
        <p className="text-sm text-gray-500">{product.manufacturer}</p>
      )}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">{name}</h3>

      {/* Memory */}
      {'memory' in product && product.memory && product.memory.length > 0 && (
        <div className="text-sm text-gray-600 mb-4 truncate">
          {product.memory.join(', ')}
        </div>
      )}
    </div>
  );
}