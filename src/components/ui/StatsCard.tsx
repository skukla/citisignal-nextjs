'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface StatsCardProps {
  icon: ElementType;
  title: string;
  iconBgColor?: string;
  iconColor?: string;
  borderColor?: string;
  shadowSize?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export default function StatsCard({
  icon: Icon,
  title,
  iconBgColor = 'bg-purple-100',
  iconColor = 'text-purple-600',
  borderColor = 'border-gray-100',
  shadowSize = 'sm',
  className,
  children
}: StatsCardProps) {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };

  const containerClasses = twMerge(
    'bg-white p-6 rounded-xl border',
    borderColor,
    shadowClasses[shadowSize],
    className
  );

  const iconContainerClasses = twMerge(
    'w-10 h-10 rounded-lg flex items-center justify-center mr-4',
    iconBgColor
  );

  const iconClasses = twMerge(
    'w-6 h-6',
    iconColor
  );

  return (
    <div className={containerClasses}>
      <div className="flex items-center mb-4">
        <div className={iconContainerClasses}>
          <Icon className={iconClasses} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
} 