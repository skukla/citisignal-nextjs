'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import { ContainerProps } from '@/types/layout';

/**
 * Container component that provides consistent max-width and padding constraints.
 * Use this for general content wrapping and layout consistency.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * 
 * // Full width without padding
 * <Container fullWidth noPadding>
 *   <HeroImage />
 * </Container>
 * 
 * // As article with custom styles
 * <Container 
 *   as="article"
 *   className="prose lg:prose-xl"
 *   role="article"
 * >
 *   <h1>Blog Post</h1>
 *   <p>Content...</p>
 * </Container>
 * ```
 */
export default function Container<T extends ElementType = 'div'>({
  as,
  children,
  fullWidth = false,
  noPadding = false,
  className,
  ...htmlAttributes
}: ContainerProps<T>) {
  const Component = as || 'div';
  
  const classes = twMerge(
    // Base styles
    'mx-auto w-full',
    !fullWidth && 'max-w-7xl',
    !noPadding && 'px-4 sm:px-6 lg:px-8',
    className
  );

  return (
    <Component 
      className={classes}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
}