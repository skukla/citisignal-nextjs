import { ProductCardInfoProps } from '../types/product.types';
import { useProductCard } from '../context/ProductCardContext';
import { hasManufacturer } from '../types/product.types';

export function ProductCardInfo({ className, showDescription }: ProductCardInfoProps) {
  const { product } = useProductCard();
  const { name, description } = product;

  return (
    <div className={`p-4 ${className ?? ''}`}>
      {hasManufacturer(product) && (
        <p className="text-sm text-gray-500">{product.manufacturer}</p>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      {showDescription && description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
}