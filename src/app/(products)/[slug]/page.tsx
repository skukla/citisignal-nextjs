'use client';

import { use } from 'react';
import { ProductDetailProvider, ProductDetailContent } from '@/components/layout/ProductDetail';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Product Detail Page
 *
 * Displays individual product information using compound components.
 * Follows the same architectural patterns as ProductPage for consistency.
 *
 * URL Pattern: /[slug]
 * Example: /samsung-galaxy-s22
 */
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);

  return (
    <ProductDetailProvider productSlug={slug}>
      <ProductDetailContent productSlug={slug} />
    </ProductDetailProvider>
  );
}
