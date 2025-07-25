'use client';

import { twMerge } from 'tailwind-merge';
import BuyingGuideCard from './BuyingGuideCard';
import type { ElementType } from 'react';

interface BuyingGuide {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
}

interface BuyingGuideGridProps {
  guides: BuyingGuide[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BuyingGuideGrid({
  guides,
  columns = {
    sm: 1,
    md: 2
  },
  gap = 'lg',
  className
}: BuyingGuideGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    return classes.join(' ');
  };

  return (
    <div className={twMerge(
      'grid',
      getColumnsClass(),
      gapClasses[gap],
      className
    )}>
      {guides.map((guide, index) => (
        <BuyingGuideCard
          key={index}
          icon={guide.icon}
          title={guide.title}
          description={guide.description}
          href={guide.href}
        />
      ))}
    </div>
  );
} 