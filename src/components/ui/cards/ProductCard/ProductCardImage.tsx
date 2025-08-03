import Image from 'next/image';
import { ProductCardImageProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

export function ProductCardImage({ className, width = 300, height = 300, priority }: ProductCardImageProps) {
  const { product } = useProductCard();
  const mainImage = product.media_gallery.find((img: { url: string; label: string; roles: string[] }) => img.roles.includes('main')) || product.media_gallery[0];

  if (!mainImage) {
    return (
      <div className={twMerge('relative overflow-hidden rounded-t-lg', className)} style={{ width, height }}>
        <EmptyState
          icon={PhotoIcon}
          title="No image"
          description="Image not available"
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className={twMerge('relative overflow-hidden rounded-t-lg', className)}>
      <Image
        src={mainImage.url}
        alt={mainImage.label || product.name}
        width={width}
        height={height}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}