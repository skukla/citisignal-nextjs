'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeGradient, ContainerWidth, ThemeGradientDirection } from '@/types/theme';

interface GradientSectionProps {
  gradient?: ThemeGradient;
  gradientDirection?: ThemeGradientDirection;
  textColor?: ThemeTextColor;
  maxWidth?: ContainerWidth;
  noPadding?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function GradientSection({
  gradient = 'from-purple-600 to-purple-900',
  gradientDirection = 'to-br',
  textColor = 'text-white',
  maxWidth = 'max-w-7xl',
  noPadding = false,
  children,
  className
}: GradientSectionProps) {
  return (
    <section 
      className={twMerge(
        'bg-gradient-' + gradientDirection,
        gradient,
        textColor,
        className
      )}
    >
      <div className={twMerge(
        maxWidth,
        'mx-auto px-4 sm:px-6 lg:px-8',
        !noPadding && 'py-20'
      )}>
        {children}
      </div>
    </section>
  );
} 