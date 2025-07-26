'use client';

import { twMerge } from 'tailwind-merge';

interface ImagePlaceholderProps {
  image?: {
    url: string;
    label: string;
  };
  aspectRatio?: 'square' | 'video';
  placeholderText?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  className?: string;
}

export default function ImagePlaceholder({
  image,
  aspectRatio = 'square',
  placeholderText,
  gradientFrom = 'from-gray-200',
  gradientTo = 'to-gray-300',
  textColor = 'text-gray-500',
  className
}: ImagePlaceholderProps) {
  const containerClasses = twMerge(
    aspectRatio === 'square' ? 'aspect-square' : 'aspect-video',
    'rounded-lg overflow-hidden',
    className
  );

  return (
    <div className={containerClasses}>
      {image ? (
        <img
          src={image.url}
          alt={image.label}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={twMerge(
          'w-full h-full bg-gradient-to-br flex items-center justify-center',
          gradientFrom,
          gradientTo
        )}>
          <span className={twMerge('text-sm font-medium', textColor)}>
            {placeholderText}
          </span>
        </div>
      )}
    </div>
  );
} 