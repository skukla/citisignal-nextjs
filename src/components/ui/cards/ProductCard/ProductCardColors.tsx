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

  const colorSize = sizeClasses[size];
  // Type guard to check if product has colors property (Phone, Watch, Accessory)
  const hasColors =
    'colors' in product && Array.isArray(product.colors) && product.colors.length > 0;
  const colors = hasColors
    ? (product as { colors: Array<{ name: string; hex: string }> }).colors
    : [];

  // Always render the container with minimum height to maintain spacing when colors exist
  return (
    <div className={twMerge('px-4 mb-4', className)}>
      <div className="flex flex-wrap gap-2 min-h-[24px] items-center">
        {' '}
        {/* Minimum height for color swatch row */}
        {hasColors && (
          <>
            {colors.slice(0, 4).map((color: { name: string; hex: string }, index: number) => (
              <div
                key={index}
                className={`${colorSize} rounded-full border-2 border-gray-200 shadow-sm`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {colors.length > 4 && (
              <div
                className={`${colorSize} rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-xs text-gray-500 font-medium`}
              >
                +{colors.length - 4}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
