'use client';

import { twMerge } from 'tailwind-merge';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  noPadding?: boolean;
  noMaxWidth?: boolean;
}

export default function SectionContainer({
  children,
  className,
  bgColor = 'bg-white',
  noPadding = false,
  noMaxWidth = false
}: SectionContainerProps) {
  return (
    <section className={twMerge(
      bgColor,
      !noPadding && 'py-20',
      className
    )}>
      <div className={twMerge(
        !noMaxWidth && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      )}>
        {children}
      </div>
    </section>
  );
} 