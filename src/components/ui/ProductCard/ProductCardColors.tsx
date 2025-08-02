import { ProductCardColorsProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { hasColors } from './ProductCard.types';
import Button from '@/components/ui/Button';
import { twMerge } from 'tailwind-merge';

export function ProductCardColors({ className, size = 'md' }: ProductCardColorsProps) {
  const { product, selectedColor, selectColor } = useProductCard();

  if (!hasColors(product) || product.available_colors.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={twMerge('px-4 pb-4', className)}>
      <p className="mb-2 text-sm font-medium text-gray-700">Color</p>
      <div className="flex space-x-2">
        {product.available_colors.map((color) => (
          <Button
            key={color.name}
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              selectColor(color.name);
            }}
            className={`rounded-full border-2 ${
              selectedColor === color.name ? 'border-blue-500' : 'border-transparent'
            } p-0.5 transition-all focus:outline-none`}
            aria-label={`Select color ${color.name}`}
          >
            <span
              className={`block rounded-full ${sizeClasses[size]}`}
              style={{ backgroundColor: color.hex }}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}