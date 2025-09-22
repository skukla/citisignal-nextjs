import { useState, useCallback } from 'react';
import { useProductDetail } from './providers/ProductDetailContext';
import { ProductDetail } from './index';
import { ProductDetailSkeleton } from './states/ProductDetailSkeleton';
import { ProductDetailError } from './states/ProductDetailError';
import { ProductDetailNotFound } from './states/ProductDetailNotFound';
import type { ProductDetail as ProductDetailType } from '@/types/commerce';

interface ProductDetailContentProps {
  productSlug: string;
}

/**
 * ProductDetailContent component
 * Smart component that handles loading, error, and success states
 * Coordinates variant selection between gallery and info components
 */
export function ProductDetailContent({ productSlug }: ProductDetailContentProps) {
  const { product, loading, error } = useProductDetail();
  const [selectedVariant, setSelectedVariant] = useState<ProductDetailType['variants'][0] | null>(
    null
  );

  const handleVariantChange = useCallback((variant: ProductDetailType['variants'][0] | null) => {
    setSelectedVariant(variant);
  }, []);

  // Loading state - show skeleton
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // Error state - show error component
  if (error) {
    return <ProductDetailError error={error} />;
  }

  // Not found state - product doesn't exist
  if (!product) {
    return <ProductDetailNotFound productSlug={productSlug} />;
  }

  // Success state - render the full product detail page
  return (
    <ProductDetail.Background color="white">
      <ProductDetail.Container>
        <ProductDetail.Breadcrumbs />

        <ProductDetail.Layout>
          <ProductDetail.Gallery selectedVariant={selectedVariant} />
          <ProductDetail.Info onVariantChange={handleVariantChange} />
        </ProductDetail.Layout>

        <ProductDetail.Tabs>
          <ProductDetail.Description />
          <ProductDetail.Specifications />
        </ProductDetail.Tabs>
      </ProductDetail.Container>
    </ProductDetail.Background>
  );
}
