'use client';

import { twMerge } from 'tailwind-merge';
import type { PreviewContentProps, PreviewTitleSize } from '@/types/preview.types';

export default function PreviewContent({
  title,
  description,
  titleSize = 'md',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  className,
  children
}: PreviewContentProps) {
  const titleSizeClasses: Record<PreviewTitleSize, string> = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={twMerge('space-y-2', className)}>
      <h3 className={twMerge(
        'font-bold group-hover:text-purple-600 transition-colors',
        titleSizeClasses[titleSize],
        titleColor
      )}>
        {title}
      </h3>
      <p className={twMerge(
        'text-base',
        descriptionColor
      )}>
        {description}
      </p>
      {children}
    </div>
  );
}