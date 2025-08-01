'use client';

import { twMerge } from 'tailwind-merge';
import type { SectionHeaderProps } from '@/types/header';

/**
 * SectionHeader component for consistent section headings across the application.
 * Provides standardized typography and spacing with optional centered alignment.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SectionHeader
 *   title="Featured Products"
 *   description="Explore our latest collection"
 * />
 * 
 * // Large centered header
 * <SectionHeader
 *   title="Our Mission"
 *   description="Building the future of communication"
 *   size="lg"
 *   centered
 * />
 * 
 * // Custom styling
 * <SectionHeader
 *   title="Get Started"
 *   className="bg-gray-50 py-8"
 * />
 * ```
 */
export default function SectionHeader({
  title,
  description,
  size = 'md',
  centered = false,
  className,
  'aria-level': ariaLevel = 2,
}: SectionHeaderProps) {
  return (
    <div 
      className={twMerge(
        'mb-16',
        centered && 'text-center',
        className
      )}
    >
      <h2 
        className={twMerge(
          'font-bold mb-4 text-gray-900',
          size === 'sm' && 'text-2xl md:text-3xl',
          size === 'md' && 'text-3xl md:text-4xl',
          size === 'lg' && 'text-4xl md:text-5xl'
        )}
        role="heading"
        aria-level={ariaLevel}
      >
        {title}
      </h2>
      {description && (
        <p 
          className={twMerge(
            'text-gray-600',
            size === 'sm' && 'text-base',
            size === 'md' && 'text-lg',
            size === 'lg' && 'text-xl',
            centered && 'max-w-3xl mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}