'use client';

import { twMerge } from 'tailwind-merge';
import Card from './Card';
import type { StatsCardProps } from '@/types/stats';

/**
 * A card component for displaying statistical information with an icon header.
 * 
 * @example
 * ```tsx
 * <StatsCard icon={SignalIcon} title="Coverage Stats" variant="purple">
 *   <ProgressBar label="5G Coverage" value={85} />
 * </StatsCard>
 * ```
 */
export default function StatsCard({
  icon: Icon,
  title,
  variant = 'purple',
  className,
  children
}: StatsCardProps) {
  const iconBgClass = variant === 'purple' ? 'bg-purple-100' :
                     variant === 'blue' ? 'bg-blue-100' :
                     variant === 'green' ? 'bg-green-100' :
                     'bg-gray-100';
  
  const iconColorClass = variant === 'purple' ? 'text-purple-600' :
                        variant === 'blue' ? 'text-blue-600' :
                        variant === 'green' ? 'text-green-600' :
                        'text-gray-600';

  return (
    <Card className={className}>
      <div className="flex items-center mb-4 p-6 pb-0">
        <div className={twMerge(
          'w-10 h-10 rounded-lg flex items-center justify-center mr-4',
          iconBgClass
        )}>
          <Icon className={twMerge(
            'w-6 h-6',
            iconColorClass
          )} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
      </div>
      <div className="px-6 pb-6">
        {children}
      </div>
    </Card>
  );
} 