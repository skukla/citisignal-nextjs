'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeBgColor, ThemeSize } from '@/types/theme';

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
  size?: ThemeSize;
  iconColor?: ThemeTextColor;
  iconBgColor?: ThemeBgColor;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  size = 'md',
  iconColor = 'text-purple-600',
  iconBgColor = 'bg-purple-50',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  className
}: FeatureCardProps) {
  const containerSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <div className={twMerge(
      'bg-white rounded-xl shadow-sm p-6',
      className
    )}>
      <div className={twMerge(
        'rounded-lg flex items-center justify-center mb-4',
        containerSizes[size],
        iconBgColor
      )}>
        <Icon className={twMerge(iconSizes[size], iconColor)} />
      </div>
      <h3 className={twMerge(
        'text-xl font-semibold mb-2',
        titleColor
      )}>
        {title}
      </h3>
      <p className={descriptionColor}>
        {description}
      </p>
    </div>
  );
} 