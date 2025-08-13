import Image from 'next/image';
import { ProductCardImageProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

export function ProductCardImage({ className, width = 300, height = 300, priority }: ProductCardImageProps) {
  const { product } = useProductCard();
  const mainImage = product.images?.find((img: { url: string; label: string; roles: string[] }) => img.roles?.includes('main')) || product.images?.[0];

  if (!mainImage) {
    return (
      <div className={twMerge('relative overflow-hidden rounded-t-lg', className)} style={{ width, height }}>
        <EmptyState
          icon={PhotoIcon}
          title="No image"
          description="Image not available"
        />
      </div>
    );
  }

  return (
    <div className={twMerge('p-4', className)}>
      <div className="relative aspect-square bg-gray-50 rounded-lg p-4">
        <Image
          src={mainImage.url}
          alt={mainImage.label || product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}