'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

interface SimplePlanCardProps {
  price: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * A simple plan card component for displaying pricing information.
 * 
 * @example
 * ```tsx
 * <SimplePlanCard 
 *   price="$10/month"
 *   title="Unlimited Talk & Text"
 *   subtitle="+ 2.5GB High-Speed Data"
 * />
 * ```
 */
function SimplePlanCard({
  price,
  title,
  subtitle,
  className
}: SimplePlanCardProps) {
  return (
    <Card className={twMerge('text-center p-4 bg-white border border-gray-200', className)}>
      <div className="text-2xl font-bold text-purple-600">
        {price}
      </div>
      <div className="text-sm text-gray-600">
        {title}
      </div>
      {subtitle && (
        <div className="text-xs mt-1 text-gray-500">
          {subtitle}
        </div>
      )}
    </Card>
  );
}

export default memo(SimplePlanCard); 