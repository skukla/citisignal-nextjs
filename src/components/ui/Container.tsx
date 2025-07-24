'use client';

import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
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