'use client';

import { twMerge } from 'tailwind-merge';
import { CheckIcon } from '@heroicons/react/24/outline';
import type { ThemeTextColor, ThemeBgColor, ThemeSize } from '@/types/theme';

interface Feature {
  title: string;
  description: string;
}

interface CheckmarkFeatureListProps {
  features: Feature[];
  size?: ThemeSize;
  iconColor?: ThemeTextColor;
  iconBgColor?: ThemeBgColor;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  className?: string;
}

export default function CheckmarkFeatureList({
  features,
  size = 'md',
  iconColor = 'text-green-500',
  iconBgColor = 'bg-green-100',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  className
}: CheckmarkFeatureListProps) {
  const containerSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={twMerge('space-y-4', className)}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <div className={twMerge(
            'rounded-full flex items-center justify-center mr-4',
            containerSizes[size],
            iconBgColor
          )}>
            <CheckIcon className={twMerge(iconSizes[size], iconColor)} />
          </div>
          <div className="flex-1">
            <div className={twMerge('text-sm font-medium', titleColor)}>
              {feature.title}
            </div>
            <div className={twMerge('text-sm', descriptionColor)}>
              {feature.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 