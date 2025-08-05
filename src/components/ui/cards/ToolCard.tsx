'use client';

import { memo } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import type { HeroIcon } from '@/types/hero-icons';

interface ToolCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

function ToolCard({
  icon: Icon,
  title,
  description,
  href,
  className,
  iconClassName,
  iconContainerClassName
}: ToolCardProps) {
  return (
    <Card 
      as={Link}
      href={href}
      interactive
      className={twMerge('group p-6 bg-white border-2 border-gray-100 hover:border-purple-200 transition-colors', className)}
    >
      <div className={twMerge(
        'w-16 h-16 rounded-lg bg-purple-50 flex items-center justify-center mb-6',
        'group-hover:bg-purple-100 transition-colors',
        iconContainerClassName
      )}>
        <Icon className={twMerge(
          'w-8 h-8 text-purple-600',
          iconClassName
        )} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </Card>
  );
}

export default memo(ToolCard); 