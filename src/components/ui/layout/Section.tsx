'use client';

import { twMerge } from 'tailwind-merge';
import Container from './Container';
import type { SectionProps } from '@/types/layout';

/**
 * Section is a foundational layout component that manages backgrounds and container behavior.
 * It serves as a base component for building more specialized sections like ContentSection.
 * 
 * Key responsibilities:
 * 1. Background management (solid colors and gradients)
 * 2. Container constraints (via internal Container component)
 * 3. Full-width flexibility
 * 4. Padding control
 * 
 * Note: For content blocks that need consistent spacing (like marketing sections,
 * feature blocks, etc.), use ContentSection instead of Section directly.
 * 
 * @example
 * ```tsx
 * // Used as foundation for specialized sections
 * function MyContentSection({ className, ...props }) {
 *   return (
 *     <Section 
 *       className={twMerge('my-specific-padding', className)}
 *       {...props}
 *     />
 *   );
 * }
 * 
 * // Background management
 * <Section background="bg-gray-100">
 *   <h2>Content with Gray Background</h2>
 * </Section>
 * 
 * // Gradient support
 * <Section 
 *   gradient="linear-gradient(135deg, #8821f4 0%, #4a148c 100%)"
 *   className="text-white"
 * >
 *   <h2>Gradient Background</h2>
 * </Section>
 * 
 * // Container control
 * <Section fullWidth noPadding>
 *   <h2>Edge-to-Edge Content</h2>
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
  const sectionClasses = twMerge(
    'w-full',
    background,
    className
  );

  const content = fullWidth ? children : (
    <Container noPadding={noPadding}>
      {children}
    </Container>
  );

  return (
    <section
      className={sectionClasses}
      style={{ ...style, ...(gradient ? { background: gradient } : {}) }}
    >
      {content}
    </section>
  );
}