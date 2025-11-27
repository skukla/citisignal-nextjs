import { useRef, useState } from 'react';
import { useProductDetail } from '../providers/ProductDetailContext';
import { useProductImage } from '@/hooks/products/useProductImage';
import { useDataSource } from '@/demo-inspector/hooks/useInspectorTracking';
import { ErrorState } from '@/components/ui/ErrorState';
import Image from 'next/image';
import type { ProductDetailGalleryProps } from '../types';

/**
 * ProductDetailGallery component
 * Displays product images in a responsive gallery
 * Shows variant-specific images when attributes are selected
 */
export function ProductDetailGallery({ className, selectedVariant }: ProductDetailGalleryProps) {
  const { product, loading, error } = useProductDetail();
  const displayImage = useProductImage({ product, selectedVariant });
  const [imageLoading, setImageLoading] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Register with Demo Inspector - dynamic source based on variant selection
  useDataSource({
    componentName: 'ProductDetailGallery',
    source: 'catalog', // Primary source
    elementRef,
    dynamicSource: () => (selectedVariant ? 'commerce' : 'catalog'),
    fieldMappings: {
      image: selectedVariant ? 'commerce' : 'catalog',
    },
    dependencies: [selectedVariant],
  });

  // Show skeleton during initial loading OR when switching variant images
  if (loading || imageLoading) {
    return (
      <div className={`lg:col-span-1 ${className || ''}`.trim()}>
        <div className="space-y-4">
          {/* Skeleton loader for all loading states */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 animate-pulse">
            <div className="h-full w-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`lg:col-span-1 ${className || ''}`.trim()}>
        <ErrorState message="Failed to load product images. Please try refreshing the page." />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div ref={elementRef} className={`lg:col-span-1 ${className || ''}`.trim()}>
      <div className="space-y-4">
        {/* Main image */}
        <div
          className="aspect-square overflow-hidden rounded-lg bg-gray-100"
          data-inspector-field="image"
          data-inspector-source={selectedVariant ? 'commerce' : 'catalog'}
          data-inspector-variant={selectedVariant ? 'true' : 'false'}
        >
          {displayImage ? (
            <Image
              src={displayImage.url}
              alt={displayImage.altText || product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
              priority
              onLoadStart={() => setImageLoading(true)}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <span>No image available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
