import { HeartIcon } from '@heroicons/react/24/solid';
import ProductBadge from './ProductBadge';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';

interface PlanCardHeaderProps {
  name: string;
  type: string;
  isNew: boolean;
  isSale: boolean;
  originalPrice?: number;
  price: number;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  titleColor?: ThemeTextColor;
  typeColor?: ThemeTextColor;
  className?: string;
}

export default function PlanCardHeader({
  name,
  type,
  isNew,
  isSale,
  originalPrice,
  price,
  isWishlisted,
  onWishlistToggle,
  titleColor = 'text-gray-900',
  typeColor = 'text-gray-600',
  className
}: PlanCardHeaderProps) {
  return (
    <div className={twMerge('h-[100px] flex flex-col mb-6', className)}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className={twMerge('text-xl font-bold mb-1', titleColor)}>
            {name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <p className={twMerge('text-sm capitalize', typeColor)}>
              {type} Plan
            </p>
            {isNew && <ProductBadge variant="new" />}
            {isSale && originalPrice && (
              <ProductBadge
                variant="discount"
                originalPrice={originalPrice}
                price={price}
              />
            )}
          </div>
        </div>
        <button
          onClick={onWishlistToggle}
          className="p-1 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
        >
          <HeartIcon 
            className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
    </div>
  );
} 