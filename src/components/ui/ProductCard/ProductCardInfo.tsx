import { ProductCardInfoProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { hasManufacturer } from './ProductCard.types';
import { twMerge } from 'tailwind-merge';

export function ProductCardInfo({ className, showDescription }: ProductCardInfoProps) {
  const { product } = useProductCard();
  const { name, description } = product;

  return (
    <div className={twMerge('p-4', className)}>
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