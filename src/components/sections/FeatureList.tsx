'use client';

import { twMerge } from 'tailwind-merge';
import type { FeatureListProps } from '@/types/section';

/**
 * FeatureList component for displaying a list of features with optional icons.
 * Used in sections like CallToAction and feature comparisons.
 */
export default function FeatureList({
  features,
  iconColor = 'text-green-500',
  className
}: FeatureListProps) {
  if (!features.length) return null;

  return (
    <ul className={twMerge('space-y-2 text-gray-600', className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          {feature.icon && (
            <feature.icon 
              className={twMerge('w-5 h-5 mr-3', iconColor)}
              aria-hidden
            />
          )}
          {feature.text}
        </li>
      ))}
    </ul>
  );
}