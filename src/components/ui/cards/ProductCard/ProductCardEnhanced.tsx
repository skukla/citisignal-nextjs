'use client';

import { useState, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductCardProvider } from './ProductCardContext';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardBadges } from './ProductCardBadges';
import { ProductCardInfo } from './ProductCardInfo';
import { ProductCardColors } from './ProductCardColors';
import { ProductCardPrice } from './ProductCardPrice';
import { ProductCardVariants } from './ProductCardVariants';
import { ProductCardActions } from './ProductCardActions';
import type { ProductType } from './ProductCard.types';
import type { BaseComponentProps } from '@/types/ui';

interface ProductCardEnhancedProps extends BaseComponentProps {
  product: ProductType;
  showImage?: boolean;
  showBadges?: boolean;
  showInfo?: boolean;
  showColors?: boolean;
  showPrice?: boolean;
  showVariants?: boolean;
  showActions?: boolean;
  variantSize?: 'sm' | 'md';
}

/**
 * Enhanced ProductCard component with variant selection capability
 * Coordinates between variant selection and add-to-cart actions
 * Shows compact variant selectors for configurable products
 */
export function ProductCardEnhanced({
  product,
  className,
  showImage = true,
  showBadges = true,
  showInfo = true,
  showColors = true,
  showPrice = true,
  showVariants = true,
  showActions = true,
  variantSize = 'sm',
}: ProductCardEnhancedProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [allAttributesSelected, setAllAttributesSelected] = useState(!product.isConfigurable);

  const handleVariantSelectionChange = useCallback(
    (newOptions: Record<string, string>, allSelected: boolean) => {
      setSelectedOptions(newOptions);
      setAllAttributesSelected(allSelected);
    },
    []
  );

  return (
    <ProductCardProvider product={product}>
      <div
        className={twMerge(
          'group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300',
          'hover:shadow-md hover:-translate-y-1',
          className
        )}
      >
        {showImage && <ProductCardImage />}
        {showBadges && <ProductCardBadges />}
        {showInfo && <ProductCardInfo />}
        {showColors && <ProductCardColors />}
        {showPrice && <ProductCardPrice />}
        {showVariants && product.isConfigurable && (
          <ProductCardVariants
            size={variantSize}
            onSelectionChange={handleVariantSelectionChange}
          />
        )}
        {showActions && (
          <ProductCardActions
            selectedOptions={selectedOptions}
            allAttributesSelected={allAttributesSelected}
          />
        )}
      </div>
    </ProductCardProvider>
  );
}
