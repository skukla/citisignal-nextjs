'use client';

import { twMerge } from 'tailwind-merge';
import CheckmarkFeatureList from './CheckmarkFeatureList';
import Link from './Link';
import type { DetailedFeature } from '@/types/section';

interface FeaturedToolProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  features: DetailedFeature[];
  className?: string;
}

/**
 * A featured tool component that displays content in a two-column layout.
 * Shows title, description, and call-to-action on the left, with feature list on the right.
 *
 * @example
 * ```tsx
 * <FeaturedTool
 *   title="Plan Optimizer"
 *   description="Find the perfect plan for your needs"
 *   buttonText="Get Started"
 *   buttonHref="/tools/optimizer"
 *   features={[
 *     { title: "AI-Powered", description: "Smart recommendations" },
 *     { title: "Save Money", description: "Up to 30% savings" }
 *   ]}
 * />
 * ```
 */
export default function FeaturedTool({
  title,
  description,
  buttonText,
  buttonHref,
  features,
  className
}: FeaturedToolProps) {
  return (
    <div className={twMerge(
      'bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 md:p-12',
      className
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {description}
          </p>
          <Link
            href={buttonHref}
            variant="button"
            buttonStyle="primary"
          >
            {buttonText}
          </Link>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <CheckmarkFeatureList features={features} />
        </div>
      </div>
    </div>
  );
} 