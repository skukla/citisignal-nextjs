import { useMemo } from 'react';

interface ProductImageProps {
  product: {
    name: string;
    image?: { url: string; altText?: string; label?: string };
    images?: Array<{ url: string; altText: string; type?: string; position?: number }>;
  } | null;
  selectedVariant?: {
    image?: { url: string; altText?: string };
    sku?: string;
  } | null;
}

/**
 * Hook for consistent product image selection logic
 * Handles variant image fallback to product image with proper alt text
 */
export function useProductImage({ product, selectedVariant }: ProductImageProps) {
  return useMemo(() => {
    if (!product) {
      return null;
    }

    // If we have a selected variant with an image, use that
    if (selectedVariant?.image?.url) {
      return {
        url: selectedVariant.image.url,
        altText:
          selectedVariant.image.altText ||
          `${product.name} - ${selectedVariant.sku || 'variant'}` ||
          product.name,
      };
    }

    // Otherwise, use primary product image (this is the expected behavior)
    const primaryImage = product.images?.[0] || product.image;
    if (!primaryImage) {
      return null;
    }

    return {
      url: primaryImage.url,
      altText:
        ('altText' in primaryImage ? primaryImage.altText : primaryImage.label) || product.name,
    };
  }, [product, selectedVariant]);
}
