'use client';

import { twMerge } from 'tailwind-merge';
import Container from './Container';

import { SectionProps } from '@/types/layout';

/**
 * Section component built on Container that adds vertical spacing and background options.
 * Use this for page sections that need visual separation or background styling.
 * 
 * @example
 * ```tsx
 * // Basic section
 * <Section>
 *   <h2>Features</h2>
 * </Section>
 * 
 * // Colored background
 * <Section background="bg-gray-100">
 *   <h2>Testimonials</h2>
 * </Section>
 * 
 * // Gradient background
 * <Section 
 *   gradient="linear-gradient(135deg, #8821f4 0%, #4a148c 100%)"
 *   className="text-white"
 * >
 *   <h2>Call to Action</h2>
 * </Section>
 * 
 * // Full width section
 * <Section fullWidth background="bg-primary-900">
 *   <h2>Hero Section</h2>
 * </Section>
 * ```
 */
export default function Section({
  children,
  className,
  background,
  gradient,
  fullWidth = false,
  noPadding = false,
  style
}: SectionProps) {
  return (
    <Container
      as="section"
      fullWidth={fullWidth}
      noPadding={noPadding}
      className={twMerge(
        'py-20',
        background,
        className
      )}
      style={{ ...style, ...(gradient ? { background: gradient } : {}) }}
    >
      {children}
    </Container>
  );
}