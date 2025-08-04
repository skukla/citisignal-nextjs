import { ProductCardColorsProps, hasColors } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { twMerge } from 'tailwind-merge';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export function ProductCardColors({ className, size = 'md' }: ProductCardColorsProps) {
  const { product } = useProductCard();

  if (!hasColors(product) || product.available_colors.length === 0) {
    return null;
  }

  const colors = product.available_colors;
  const colorSize = sizeClasses[size];

  return (
    <div className={twMerge('px-4 mb-4', className)}>
      <div className="text-sm text-gray-600 mb-2">Available Colors:</div>
      <div className="flex flex-wrap gap-2">
        {colors.slice(0, 4).map((color, index) => (
          <div
            key={index}
            className={`${colorSize} rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform`}
            style={{ backgroundColor: color.hex }}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
        {colors.length > 4 && (
          <div className={`${colorSize} rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-500 font-medium`}>
            +{colors.length - 4}
          </div>
        )}
      </div>
    </div>
  );
}