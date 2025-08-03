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
  return (
    <ul className={twMerge(
      // Spacing variants - direct conditionals following Button pattern
      spacing === 'sm' && 'space-y-2',
      spacing === 'md' && 'space-y-3',
      spacing === 'lg' && 'space-y-4',
      className
    )}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <li key={index} className="flex items-center">
            <Icon className={twMerge(
              // Icon size variants - direct conditionals
              iconSize === 'sm' && 'w-4 h-4',
              iconSize === 'md' && 'w-5 h-5',
              iconSize === 'lg' && 'w-6 h-6',
              'mr-2',
              iconColor
            )} />
            <span className={textColor}>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
} 