'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface StatsListItem {
  icon: ElementType;
  text: string;
}

interface StatsListProps {
  items: StatsListItem[];
  iconColor?: string;
  textColor?: string;
  spacing?: 'sm' | 'md' | 'lg';
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatsList({
  items,
  iconColor = 'text-purple-600',
  textColor = 'text-gray-600',
  spacing = 'md',
  iconSize = 'md',
  className
}: StatsListProps) {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const listClasses = twMerge(
    spacingClasses[spacing],
    className
  );

  const iconClasses = twMerge(
    iconSizeClasses[iconSize],
    'mr-2',
    iconColor
  );

  return (
    <ul className={listClasses}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <li key={index} className="flex items-center">
            <Icon className={iconClasses} />
            <span className={textColor}>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
} 