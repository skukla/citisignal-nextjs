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
 * // With gap and alignment
 * <Grid 
 *   columns={{ sm: 1, lg: 4 }}
 *   gap="lg"
 *   align="center"
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
  align = 'stretch',
  className
}: GridProps) {
  // Map gap sizes to Tailwind classes
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  // Map alignment to Tailwind classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  // Generate responsive column classes
  const getColumnsClass = () => {
    const classes = [];
    
    // Handle each breakpoint
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    
    return classes.join(' ');
  };

  return (
    <div 
      className={twMerge(
        // Base styles
        'grid w-full',
        
        // Responsive columns
        getColumnsClass(),
        
        // Gap and alignment
        gapClasses[gap],
        alignClasses[align],
        
        // Custom classes
        className
      )}
    >
      {children}
    </div>
  );
}