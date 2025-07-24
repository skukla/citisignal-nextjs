import Image from 'next/image';
import clsx from 'clsx';

interface ProductImagePlaceholderProps {
  image?: {
    url: string;
    label: string;
  };
  category: string;
  className?: string;
}

export default function ProductImagePlaceholder({ 
  image, 
  category,
  className 
}: ProductImagePlaceholderProps) {
  return (
    <div className={clsx(
      'aspect-square rounded-lg mb-4',
      'flex items-center justify-center overflow-hidden',
      'bg-gray-100',
      className
    )}>
      {image ? (
        <Image 
          src={image.url}
          alt={image.label}
          fill
          className={clsx(
            'object-cover',
            'transition-transform duration-300',
            'group-hover:scale-105'
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className={clsx(
          'w-full h-full',
          'flex items-center justify-center',
          'bg-gradient-to-br from-gray-100 to-gray-200'
        )}>
          <span className="text-gray-500 text-sm font-medium">{category}</span>
        </div>
      )}
    </div>
  );
} 