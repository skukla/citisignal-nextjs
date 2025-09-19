import { useProductDetail } from '../providers/ProductDetailContext';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import Image from 'next/image';
import type { ProductDetailGalleryProps } from '../types';

/**
 * ProductDetailGallery component
 * Displays product images in a responsive gallery
 * For now, shows the primary image with placeholder for additional images
 */
export function ProductDetailGallery({ className }: ProductDetailGalleryProps) {
  const { product, loading, error } = useProductDetail();

  if (loading) {
    return (
      <div className={`lg:col-span-2 ${className || ''}`.trim()}>
        <LoadingState message="Loading product images..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`lg:col-span-2 ${className || ''}`.trim()}>
        <ErrorState message="Failed to load product images. Please try refreshing the page." />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Use primary image or first available image, handling both image types
  const primaryImage = product.images?.[0] || product.image;
  const imageUrl = primaryImage?.url;
  const imageAlt =
    primaryImage && 'altText' in primaryImage
      ? primaryImage.altText
      : primaryImage && 'label' in primaryImage
        ? primaryImage.label
        : product.name;

  return (
    <div className={`lg:col-span-2 ${className || ''}`.trim()}>
      <div className="space-y-4">
        {/* Main image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <span>No image available</span>
            </div>
          )}
        </div>

        {/* Thumbnail gallery - placeholder for future enhancement */}
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded border bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.altText || `${product.name} image ${index + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
