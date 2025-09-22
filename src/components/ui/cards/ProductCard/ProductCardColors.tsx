import { ProductCardColorsProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { twMerge } from 'tailwind-merge';

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function ProductCardColors({ className, size = 'md' }: ProductCardColorsProps) {
  const { product } = useProductCard();

  // Check if product has color data
  if (!product.colors || !Array.isArray(product.colors) || product.colors.length === 0) {
    return null;
  }

  const colorSize = sizeClasses[size];
  const totalColors = product.colors.length;
  const displayColors = product.colors.slice(0, 4);

  return (
    <div className={twMerge('px-4 mb-4', className)}>
      <div className="flex flex-wrap gap-2">
        {displayColors.map((color, index) => {
          return (
            <div
              key={index}
              className={`${colorSize} rounded-full border-2 border-gray-200 shadow-sm`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          );
        })}
        {totalColors > 4 && (
          <div
            className={`${colorSize} rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-500 font-medium`}
          >
            +{totalColors - 4}
          </div>
        )}
      </div>
    </div>
  );
}
