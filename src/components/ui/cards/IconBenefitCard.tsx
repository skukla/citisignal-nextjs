'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import type { HeroIcon } from '@/types/hero-icons';

export interface IconBenefitCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

/**
 * IconBenefitCard component for displaying benefit information with HeroIcon.
 * 
 * @example
 * ```tsx
 * <IconBenefitCard
 *   icon={ShieldCheckIcon}
 *   title="Secure Connection"
 *   description="Advanced encryption keeps your data safe"
 *   iconColor="text-purple-600"
 *   iconBgColor="bg-purple-100"
 * />
 * ```
 */
function IconBenefitCard({
  icon: IconComponent,
  title,
  description,
  iconColor = 'text-purple-600',
  iconBgColor = 'bg-purple-100',
  className
}: IconBenefitCardProps) {
  return (
    <Card 
      className={twMerge('p-6 shadow-sm', className)}
    >
      <div className={twMerge(
        'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
        iconBgColor
      )}>
        <IconComponent className={twMerge('w-6 h-6', iconColor)} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </Card>
  );
}

export default memo(IconBenefitCard);