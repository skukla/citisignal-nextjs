'use client';

import { twMerge } from 'tailwind-merge';

interface PlanGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PlanGrid({
  children,
  columns = {
    sm: 1,
    lg: 2,
    xl: 3
  },
  gap = 'md',
  className
}: PlanGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const columnClasses = [
    `grid-cols-${columns.sm || 1}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`
  ].filter(Boolean);

  return (
    <div className={twMerge(
      'grid',
      columnClasses.join(' '),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
} 