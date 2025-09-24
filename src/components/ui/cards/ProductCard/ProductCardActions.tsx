'use client';

import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Button from '@/components/ui/foundations/Button';
import { useCart } from '@/components/ui/layout/Cart';
import { useProductCard } from './ProductCardContext';
import type { BaseComponentProps } from '@/types/ui';

interface ProductCardActionsProps extends BaseComponentProps {
  selectedOptions?: Record<string, string>;
  allAttributesSelected?: boolean;
}

export function ProductCardActions({
  className,
  selectedOptions = {},
  allAttributesSelected = true,
}: ProductCardActionsProps) {
  const { product } = useProductCard();
  const { addItem } = useCart();
  const isOutOfStock = !product?.inStock;

  const handleAddToCartClick = useCallback(() => {
    if (!isOutOfStock && product && allAttributesSelected) {
      // Parse the price string (e.g., "$999.99") to get the numeric value
      const numericPrice = parseFloat(product.price.replace('$', ''));

      addItem({
        id: product.id,
        name: product.name,
        price: numericPrice,
        imageUrl: product.image?.url,
        selectedOptions: product.isConfigurable ? selectedOptions : undefined,
      });
    }
  }, [isOutOfStock, product, allAttributesSelected, selectedOptions, addItem]);

  // Determine button state and text
  const getButtonState = () => {
    if (isOutOfStock) return { text: 'Out of Stock', disabled: true };
    if (product.isConfigurable && !allAttributesSelected) {
      return { text: 'Select Options', disabled: true };
    }
    return { text: 'Add to Cart', disabled: false };
  };

  const buttonState = getButtonState();

  return (
    <div className={twMerge('space-y-2 px-4 pb-4', className)}>
      <Button
        onClick={handleAddToCartClick}
        disabled={buttonState.disabled}
        className={twMerge(
          'w-full py-3',
          buttonState.disabled
            ? 'bg-gray-300 text-gray-500'
            : 'bg-[#8821f4] text-white hover:opacity-90'
        )}
      >
        {buttonState.text}
      </Button>
      <Button
        as={Link}
        href={`/products/${product.urlKey}`}
        variant="outline"
        className="w-full py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        View Details
      </Button>
    </div>
  );
}
