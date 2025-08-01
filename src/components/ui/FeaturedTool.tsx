'use client';

import { twMerge } from 'tailwind-merge';
import CheckmarkFeatureList from './CheckmarkFeatureList';
import Link from './Link';

interface Feature {
  title: string;
  description: string;
}

interface FeaturedToolProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  features: Feature[];
  className?: string;
  gradient?: string;
}

export default function FeaturedTool({
  title,
  description,
  buttonText,
  buttonHref,
  features,
  className,
  gradient = 'from-purple-50 to-purple-100'
}: FeaturedToolProps) {
  return (
    <div className={twMerge(
      'bg-gradient-to-br rounded-2xl p-8 md:p-12',
      gradient,
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