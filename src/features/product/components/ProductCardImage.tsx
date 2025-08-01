import Image from 'next/image';
import { ProductCardImageProps } from '../types/product.types';
import { useProductCard } from '../context/ProductCardContext';

export function ProductCardImage({ className, width = 300, height = 300, priority }: ProductCardImageProps) {
  const { product } = useProductCard();
  const mainImage = product.media_gallery.find(img => img.roles.includes('main')) || product.media_gallery[0];

  if (!mainImage) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className ?? ''}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-t-lg ${className ?? ''}`}>
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