'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '@/components/ui/cards/Card';
import CheckmarkFeatureList from '@/components/ui/content/CheckmarkFeatureList';
import Link from '@/components/ui/foundations/Link';
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
function FeaturedTool({
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
            className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors bg-[#8821f4] hover:bg-purple-700"
          >
            {buttonText}
          </Link>
        </div>
        <Card className="p-6">
          <CheckmarkFeatureList features={features} />
        </Card>
      </div>
    </div>
  );
}

export default memo(FeaturedTool); 