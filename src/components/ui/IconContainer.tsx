'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeBgColor, ThemeBgOpacity } from '@/types/theme';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  bgColor?: ThemeBgColor | 'bg-white' | 'bg-black';
  bgOpacity?: ThemeBgOpacity;
  centered?: boolean;
  className?: string;
}

export default function IconContainer({
  children,
  size = 'md',
  bgColor = 'bg-white',
  bgOpacity = 'bg-opacity-20',
  centered = true,
  className
}: IconContainerProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const classes = [
    'rounded-full flex items-center justify-center',
    sizeClasses[size],
    bgColor,
    bgOpacity,
    centered && 'mx-auto',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
} 