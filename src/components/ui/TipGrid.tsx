'use client';

import { twMerge } from 'tailwind-merge';
import TipCard from './TipCard';

interface Tip {
  category: string;
  title: string;
  description: string;
  href: string;
  categoryColor?: string;
}

interface TipGridProps {
  tips: Tip[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TipGrid({
  tips,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'lg',
  className
}: TipGridProps) {
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
      {tips.map((tip, index) => (
        <TipCard
          key={index}
          category={tip.category}
          title={tip.title}
          description={tip.description}
          href={tip.href}
          categoryColor={tip.categoryColor}
        />
      ))}
    </div>
  );
} 