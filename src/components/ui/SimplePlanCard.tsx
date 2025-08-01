'use client';

import { twMerge } from 'tailwind-merge';

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
export default function SimplePlanCard({
  price,
  title,
  subtitle,
  className
}: SimplePlanCardProps) {
  return (
    <div className={twMerge('text-center', className)}>
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
    </div>
  );
} 