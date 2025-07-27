'use client';

import { twMerge } from 'tailwind-merge';
import type { 
  ThemeTextColor, 
  ThemeGradient, 
  ThemeGradientDirection,
  ThemeAspectRatio,
  ThemeTextSize,
} from '@/types/theme';

interface ImagePlaceholderProps {
  image?: {
    url: string;
    label: string;
  };
  aspectRatio?: ThemeAspectRatio;
  placeholderText?: string;
  textSize?: ThemeTextSize;
  gradient?: ThemeGradient;
  gradientDirection?: ThemeGradientDirection;
  textColor?: ThemeTextColor;
  className?: string;
}

export default function ImagePlaceholder({
  image,
  aspectRatio = 'square',
  placeholderText,
  textSize = 'sm',
  gradient = 'from-purple-100 to-purple-200',
  gradientDirection = 'to-br',
  textColor = 'text-gray-500',
  className
}: ImagePlaceholderProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square'
  };

  const textSizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const containerClasses = twMerge(
    aspectRatioClasses[aspectRatio],
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
          'w-full h-full flex items-center justify-center',
          `bg-gradient-${gradientDirection}`,
          gradient
        )}>
          <span className={twMerge(
            'font-medium',
            textSizes[textSize],
            textColor
          )}>
            {placeholderText}
          </span>
        </div>
      )}
    </div>
  );
} 