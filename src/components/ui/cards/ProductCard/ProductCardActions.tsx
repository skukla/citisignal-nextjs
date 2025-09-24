'use client';

import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/foundations/Button';
import { useCart } from '@/components/ui/layout/Cart';
import { useProductCard } from './ProductCardContext';
import { hasConfigurableOptions } from './ProductCard.types';
import type { BaseComponentProps } from '@/types/ui';

export function ProductCardActions({ className }: BaseComponentProps) {
  const { product } = useProductCard();
  const { addItem } = useCart();
  const router = useRouter();
  const isOutOfStock = !product?.inStock;
  const isConfigurable = hasConfigurableOptions(product);

  const handlePrimaryAction = () => {
    if (isOutOfStock) return;

    if (isConfigurable) {
      // Navigate to product detail page for variant selection
      router.push(`/${product.urlKey}`);
    } else {
      // Direct add to cart for simple products
      const numericPrice = parseFloat(product.price.replace('$', ''));
      addItem({
        id: product.id,
        name: product.name,
        price: numericPrice,
        imageUrl: product.image?.url,
      });
    }
  };

  const handleViewDetails = () => {
    router.push(`/${product.urlKey}`);
  };

  // Button text based on product type and stock
  const getPrimaryButtonText = () => {
    if (isOutOfStock) return 'Out of Stock';
    if (isConfigurable) return 'Configure';
    return 'Add to Cart';
  };

  return (
    <div className={twMerge('space-y-2 px-4 pb-4', className)}>
      <Button
        onClick={handlePrimaryAction}
        disabled={isOutOfStock}
        className={twMerge(
          'w-full py-3',
          isOutOfStock ? 'bg-gray-300 text-gray-500' : 'bg-[#8821f4] text-white hover:opacity-90'
        )}
      >
        {getPrimaryButtonText()}
      </Button>

      {/* Only show View Details for simple products */}
      {!isConfigurable && (
        <Button
          onClick={handleViewDetails}
          variant="outline"
          className="w-full py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          View Details
        </Button>
      )}
    </div>
  );
}
