'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface BuyingGuideCardProps {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
  className?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

export default function BuyingGuideCard({
  icon: Icon,
  title,
  description,
  href,
  className,
  iconClassName,
  iconContainerClassName
}: BuyingGuideCardProps) {
  return (
    <div className={twMerge(
      'flex gap-6 items-start group',
      className
    )}>
      <div className={twMerge(
        'w-20 h-20 rounded-lg bg-purple-50 flex-shrink-0 flex items-center justify-center',
        'group-hover:bg-purple-100 transition-colors',
        iconContainerClassName
      )}>
        <Icon className={twMerge(
          'w-10 h-10 text-purple-600',
          iconClassName
        )} />
      </div>
      <div>
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
    </div>
  );
} 