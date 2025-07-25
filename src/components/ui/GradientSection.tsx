'use client';

import { twMerge } from 'tailwind-merge';

interface GradientSectionProps {
  gradient?: string;
  textColor?: string;
  padding?: string;
  maxWidth?: string;
  children: React.ReactNode;
  className?: string;
}

export default function GradientSection({
  gradient = 'linear-gradient(135deg, #8821f4 0%, #6a1b9a 50%, #4a148c 100%)',
  textColor = 'text-white',
  padding = 'py-20',
  maxWidth = 'max-w-7xl',
  children,
  className
}: GradientSectionProps) {
  const sectionClasses = twMerge(
    textColor,
    className
  );

  const containerClasses = twMerge(
    maxWidth,
    'mx-auto px-4 sm:px-6 lg:px-8',
    padding
  );

  return (
    <section 
      className={sectionClasses}
      style={{ background: gradient }}
    >
      <div className={containerClasses}>
        {children}
      </div>
    </section>
  );
} 