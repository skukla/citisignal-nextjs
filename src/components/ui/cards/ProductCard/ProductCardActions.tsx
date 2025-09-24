'use client';

import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/foundations/Button';
import { useCart } from '@/components/ui/layout/Cart/CartProvider';
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
      // Use both formatted display price and raw numeric price
      const displayPrice = product.price || '$0.00';
      const numericPrice = product.priceValue ?? parseFloat(product.price.replace(/[\$,]/g, ''));
      addItem({
        id: product.id,
        name: product.name,
        price: displayPrice, // Formatted: "$1,199.99"
        priceValue: numericPrice, // Raw: 1199.99
        // Use thumbnail for cart (optimized for small display)
        imageUrl: product.thumbnail?.url || product.image?.url,
        // Simple products don't have options, so variantId is just the product id
        variantId: product.id,
      });
    }
  };

  // Button text based on product type and stock
  const getPrimaryButtonText = () => {
    if (isOutOfStock) return 'Out of Stock';
    if (isConfigurable) return 'Configure';
    return 'Add to Cart';
  };

  return (
    <div className={twMerge('mt-auto space-y-2 px-4 pb-4', className)}>
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
    </div>
  );
}
