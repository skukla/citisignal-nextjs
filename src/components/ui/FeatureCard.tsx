'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor = 'text-purple-600',
  iconBgColor = 'bg-purple-50',
  className
}: FeatureCardProps) {
  return (
    <div className={twMerge(
      'bg-white p-6 rounded-xl shadow-sm',
      className
    )}>
      <div className={twMerge(
        'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
        iconBgColor
      )}>
        <Icon className={twMerge('w-6 h-6', iconColor)} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
} 