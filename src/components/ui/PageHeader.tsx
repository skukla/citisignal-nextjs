'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeSize } from '@/types/theme';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: ElementType;
  size?: ThemeSize;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  iconColor?: ThemeTextColor;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  size = 'md',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  iconColor = 'text-purple-600',
  className
}: PageHeaderProps) {
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      title: 'text-2xl',
      description: 'text-base'
    },
    md: {
      icon: 'w-8 h-8',
      title: 'text-3xl',
      description: 'text-lg'
    },
    lg: {
      icon: 'w-10 h-10',
      title: 'text-4xl',
      description: 'text-xl'
    }
  };

  return (
    <div className={twMerge('mb-8', className)}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={twMerge(sizeClasses[size].icon, iconColor)} />
        <h1 className={twMerge(
          sizeClasses[size].title,
          'font-bold',
          titleColor
        )}>
          {title}
        </h1>
      </div>
      <p className={twMerge(
        sizeClasses[size].description,
        'max-w-3xl',
        descriptionColor
      )}>
        {description}
      </p>
    </div>
  );
} 