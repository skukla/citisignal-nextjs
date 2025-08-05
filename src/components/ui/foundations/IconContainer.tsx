'use client';

import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

interface IconContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  bgOpacity?: string;
  className?: string;
}

export default function IconContainer({
  children,
  size = 'md',
  bgColor = 'bg-purple-50',
  bgOpacity = 'bg-opacity-100',
  className
}: IconContainerProps) {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  return (
    <div className={twMerge(
      'rounded-lg',
      sizeClasses[size],
      bgColor,
      bgOpacity,
      'transition-colors',
      className
    )}>
      {children}
    </div>
  );
}