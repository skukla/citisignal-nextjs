import { useProductDetail } from './providers/ProductDetailContext';
import { ProductDetail } from './index';
import { ProductDetailSkeleton } from './states/ProductDetailSkeleton';
import { ProductDetailError } from './states/ProductDetailError';
import { ProductDetailNotFound } from './states/ProductDetailNotFound';

interface ProductDetailContentProps {
  productSlug: string;
}

/**
 * ProductDetailContent component
 * Smart component that handles loading, error, and success states
 * Follows the same pattern as ProductPageContent
 */
export function ProductDetailContent({ productSlug }: ProductDetailContentProps) {
  const { product, loading, error } = useProductDetail();

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
          <ProductDetail.Gallery />

          <ProductDetail.Info>
            <ProductDetail.Header />
            <ProductDetail.Price />
            <ProductDetail.Variants />
            <ProductDetail.Actions />
          </ProductDetail.Info>
        </ProductDetail.Layout>

        <ProductDetail.Tabs>
          <ProductDetail.Description />
          <ProductDetail.Specifications />
          <ProductDetail.Reviews />
        </ProductDetail.Tabs>

        <ProductDetail.RelatedProducts />
      </ProductDetail.Container>
    </ProductDetail.Background>
  );
}
