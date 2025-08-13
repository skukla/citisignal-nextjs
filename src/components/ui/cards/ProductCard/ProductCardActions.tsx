'use client';

import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useCart } from '@/components/ui/layout/Cart';
import { useProductCard } from './ProductCardContext';
import type { BaseComponentProps } from '@/types/ui';

export function ProductCardActions({
  className
}: BaseComponentProps) {
  const { product } = useProductCard();
  const { addItem } = useCart();
  const isOutOfStock = product?.stock_status === 'out_of_stock';

  const handleAddToCartClick = () => {
    if (!isOutOfStock && product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images?.[0]?.url
      });
    }
  };

  return (
    <div className={twMerge('space-y-2 px-4 pb-4', className)}>
      <Button
        onClick={handleAddToCartClick}
        disabled={isOutOfStock}
        className={twMerge(
          'w-full py-3',
          isOutOfStock ? 'bg-gray-300 text-gray-500' : 'bg-[#8821f4] text-white hover:opacity-90'
        )}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </Button>
      <Button
        variant="outline"
        className="w-full py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        View Details
      </Button>
    </div>
  );
}