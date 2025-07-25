'use client';

import { twMerge } from 'tailwind-merge';

interface ProductGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProductGrid({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className
}: ProductGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const columnClasses = [
    `grid-cols-${columns.sm || 1}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`
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