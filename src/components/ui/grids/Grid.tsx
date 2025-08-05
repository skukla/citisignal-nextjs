'use client';

import { twMerge } from 'tailwind-merge';
import type { GridProps } from '@/types/grid';

/**
 * A responsive grid layout component.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Grid columns={{ sm: 1, md: 2, lg: 3 }}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Grid>
 * 
 * // With custom gap
 * <Grid 
 *   columns={{ sm: 1, lg: 4 }}
 *   gap="lg"
 * >
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Grid>
 * ```
 */
export default function Grid({
  children,
  columns,
  gap = 'md',
  className
}: GridProps) {
  return (
    <div 
      className={twMerge(
        // Base grid styles
        'grid w-full',
        
        // Responsive columns - inline logic following Button pattern
        columns.sm && `grid-cols-${columns.sm}`,
        columns.md && `md:grid-cols-${columns.md}`,
        columns.lg && `lg:grid-cols-${columns.lg}`,
        columns.xl && `xl:grid-cols-${columns.xl}`,
        
        // Gap - direct conditional classes following Button pattern
        gap === 'sm' && 'gap-4',
        gap === 'md' && 'gap-6',
        gap === 'lg' && 'gap-8',
        gap === 'xl' && 'gap-12',
        
        // Custom classes
        className
      )}
    >
      {children}
    </div>
  );
}