'use client';

import { twMerge } from 'tailwind-merge';
import type { ContainerWidth, ContainerPadding } from '@/types/theme';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerWidth;
  padding?: ContainerPadding | string;
  className?: string;
}

export default function Container({
  children,
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8',
  className
}: ContainerProps) {
  const containerClasses = twMerge(
    maxWidth,
    padding,
    'mx-auto',
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
} 