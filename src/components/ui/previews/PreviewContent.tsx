'use client';

import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

interface PreviewContentProps {
  title: string;
  description: string;
  titleSize?: 'sm' | 'md' | 'lg';
  titleColor?: string;
  descriptionColor?: string;
  className?: string;
  children?: ReactNode;
}

export default function PreviewContent({
  title,
  description,
  titleSize = 'md',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  className,
  children
}: PreviewContentProps) {
  const titleSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={twMerge('space-y-2', className)}>
      <h3 className={twMerge(
        'font-semibold group-hover:text-purple-600 transition-colors',
        titleSizeClasses[titleSize],
        titleColor
      )}>
        {title}
      </h3>
      <p className={twMerge(
        'text-sm line-clamp-2',
        descriptionColor
      )}>
        {description}
      </p>
      {children}
    </div>
  );
}