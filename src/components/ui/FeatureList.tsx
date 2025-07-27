'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeSize } from '@/types/theme';
import type { HighlightFeature } from '@/types/features';
import type { FeatureSpacing } from '@/types/layout';

interface FeatureListProps {
  features: HighlightFeature[];
  textColor?: ThemeTextColor;
  detailsColor?: ThemeTextColor;
  dotSize?: ThemeSize;
  spacing?: FeatureSpacing;
  detailsIndent?: string;
  className?: string;
}

export default function FeatureList({
  features,
  textColor = 'text-white',
  detailsColor = 'text-purple-100',
  dotSize = 'sm',
  spacing = 'md',
  detailsIndent = 'ml-5',
  className
}: FeatureListProps) {
  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  const spacingClasses = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3'
  };

  const containerClasses = twMerge(
    spacingClasses[spacing],
    className
  );

  return (
    <div className={containerClasses}>
      {features.map((feature, index) => (
        <div key={index}>
          <div className="flex items-center">
            <div className={twMerge(
              dotSizeClasses[dotSize],
              'rounded-full mr-3',
              feature.dotColor || 'bg-green-400'
            )} />
            <span className={twMerge('font-medium', textColor)}>
              {feature.highlight}
            </span>
          </div>
          {feature.details && (
            <div className={twMerge('text-sm', detailsColor, detailsIndent)}>
              {feature.details}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 