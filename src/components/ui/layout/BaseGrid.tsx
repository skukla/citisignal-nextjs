'use client';

import { twMerge } from 'tailwind-merge';
import type { GridGap } from '@/types/grid';

export interface GridColumns {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface BaseGridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  centered?: boolean;
  className?: string;
}

export default function BaseGrid({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  centered = false,
  className
}: BaseGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
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
      centered && 'place-items-center',
      className
    )}>
      {children}
    </div>
  );
} 