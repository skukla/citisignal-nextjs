'use client';

import { twMerge } from 'tailwind-merge';
import type { BaseComponentProps } from '@/types/ui';

interface ContentProps extends BaseComponentProps {
  maxWidth?: '2xl' | '4xl' | '7xl';
  padding?: {
    x?: 'none' | 'sm' | 'md' | 'lg';
    y?: 'none' | 'sm' | 'md' | 'lg';
  };
}

/**
 * Provides constrained width and standard padding for content.
 * Use this inside Page when you need centered, width-constrained content.
 */
export default function Content({ 
  children,
  maxWidth = '7xl',
  padding = { x: 'lg', y: 'md' },
  className 
}: ContentProps) {
  return (
    <div className={twMerge(
      'mx-auto',
      // Max width
      maxWidth === '2xl' && 'max-w-2xl',
      maxWidth === '4xl' && 'max-w-4xl',
      maxWidth === '7xl' && 'max-w-7xl',
      
      // Horizontal padding
      padding.x === 'none' && '',
      padding.x === 'sm' && 'px-2 sm:px-4',
      padding.x === 'md' && 'px-4 sm:px-6',
      padding.x === 'lg' && 'px-4 sm:px-6 lg:px-8',
      
      // Vertical padding
      padding.y === 'none' && '',
      padding.y === 'sm' && 'py-4',
      padding.y === 'md' && 'py-8',
      padding.y === 'lg' && 'py-12',
      
      className
    )}>
      {children}
    </div>
  );
}