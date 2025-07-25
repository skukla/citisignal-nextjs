'use client';

import { twMerge } from 'tailwind-merge';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface TipCardProps {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor?: string;
  className?: string;
}

export default function TipCard({
  category,
  title,
  description,
  href,
  categoryColor = 'purple',
  className
}: TipCardProps) {
  return (
    <div className={twMerge(
      'group cursor-pointer',
      className
    )}>
      <div className={twMerge(
        'text-sm font-medium mb-2',
        `text-${categoryColor}-600`
      )}>
        {category}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-3">
        {description}
      </p>
      <Button
        href={href}
        variant="link"
        size="sm"
        rightIcon={ArrowRightIcon}
      >
        Read More
      </Button>
    </div>
  );
} 