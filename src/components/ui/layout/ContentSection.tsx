'use client';

import { twMerge } from 'tailwind-merge';
import Section from './Section';
import type { SectionProps } from '@/types/layout';

/**
 * ContentSection component for page content blocks.
 * Extends Section with consistent vertical padding and content structure.
 * Use this for marketing sections, feature blocks, and other content areas
 * that need consistent spacing and background styling.
 * 
 * @example
 * ```tsx
 * // Basic content section
 * <ContentSection>
 *   <h2>Features</h2>
 * </ContentSection>
 * 
 * // With background color
 * <ContentSection background="bg-gray-50">
 *   <h2>Benefits</h2>
 * </ContentSection>
 * 
 * // With gradient background
 * <ContentSection 
 *   gradient="linear-gradient(135deg, #8821f4 0%, #4a148c 100%)"
 *   className="text-white"
 * >
 *   <h2>Call to Action</h2>
 * </ContentSection>
 * ```
 */
export default function ContentSection({
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Section 
      className={twMerge('py-20', className)}
      {...props}
    >
      {children}
    </Section>
  );
}