'use client';

import { twMerge } from 'tailwind-merge';
import type { DetailedFeature } from '@/types/section';

interface CheckmarkFeatureListProps {
  features: DetailedFeature[];
  className?: string;
}

/**
 * A feature list component with green checkmark icons.
 * Displays title and description for each feature in a clean, consistent layout.
 *
 * @example
 * ```tsx
 * <CheckmarkFeatureList 
 *   features={[
 *     { title: "Fast Setup", description: "Get started in minutes" },
 *     { title: "24/7 Support", description: "Always here to help" }
 *   ]}
 * />
 * ```
 */
export default function CheckmarkFeatureList({
  features,
  className
}: CheckmarkFeatureListProps) {
  return (
    <div className={twMerge('space-y-4', className)}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 bg-green-100">
            <svg 
              className="w-5 h-5 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {feature.title}
            </div>
            <div className="text-sm text-gray-600">
              {feature.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 