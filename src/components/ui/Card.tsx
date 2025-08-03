'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { TRANSITION_CLASSES } from '@/lib/ui-constants';
import type { CardComponentProps } from '@/types/card';

/**
 * A flexible card component that serves as a container for content.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Card>Content</Card>
 * 
 * // Interactive card
 * <Card interactive>Hoverable content</Card>
 * 
 * // As a button
 * <Card as="button" interactive onClick={handleClick}>
 *   Clickable card
 * </Card>
 * 
 * // With sections
 * <Card>
 *   <div className="p-6 border-b">Header</div>
 *   <div className="p-6">Content</div>
 *   <div className="p-6 border-t">Footer</div>
 * </Card>
 * ```
 */
export default function Card<T extends ElementType = 'div'>({
  as,
  children,
  interactive = false,
  className,
  ...props
}: CardComponentProps<T>) {
  // Use the specified element type or default to div
  const Component = as || 'div';

  const classes = twMerge(
    // Base styles - matching existing card patterns
    'bg-white border border-gray-200 rounded-xl',
    
    // Shadow states
    interactive
      ? `shadow-sm hover:shadow-lg ${TRANSITION_CLASSES.shadow}`
      : 'shadow-sm',
    
    // Allow custom classes to override defaults
    className
  );

  return (
    <Component 
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}