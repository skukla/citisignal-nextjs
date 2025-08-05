'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { FeatureListProps } from '@/types/section';

/**
 * IconFeatureList component for displaying a list of features with optional icons.
 * 
 * @example
 * ```tsx
 * <IconFeatureList
 *   features={[
 *     { text: "Free shipping", icon: TruckIcon },
 *     { text: "24/7 support", icon: ChatIcon }
 *   ]}
 *   iconColor="text-green-500"
 * />
 * ```
 */
function IconFeatureList({
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

export default memo(IconFeatureList);