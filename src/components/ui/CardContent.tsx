'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeTextSize } from '@/types/theme';

interface CardContentProps {
  title: string;
  description: string;
  titleSize?: ThemeTextSize;
  descriptionSize?: Exclude<ThemeTextSize, 'xl'>;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  centered?: boolean;
  className?: string;
}

export default function CardContent({
  title,
  description,
  titleSize = 'base',
  descriptionSize = 'sm',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  centered = false,
  className
}: CardContentProps) {
  const titleSizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const descriptionSizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={twMerge(
      centered && 'text-center',
      className
    )}>
      <h3 className={twMerge(
        titleSizes[titleSize],
        'font-semibold mb-1',
        titleColor
      )}>
        {title}
      </h3>
      <p className={twMerge(
        descriptionSizes[descriptionSize],
        'leading-relaxed',
        descriptionColor
      )}>
        {description}
      </p>
    </div>
  );
} 