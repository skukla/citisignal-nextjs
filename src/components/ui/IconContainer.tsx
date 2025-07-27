'use client';

import { clsx } from 'clsx';
import type { ThemeBgColor, ThemeBgOpacity, ThemeSize } from '@/types/theme';

interface IconContainerProps {
  children: React.ReactNode;
  size?: ThemeSize;
  bgColor?: ThemeBgColor;
  bgOpacity?: ThemeBgOpacity;
  centered?: boolean;
  className?: string;
}

export default function IconContainer({
  children,
  size = 'md',
  bgColor = 'bg-white',
  bgOpacity = 'bg-opacity-25',
  centered = true,
  className = 'mb-3'
}: IconContainerProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <div className={clsx(
      'rounded-full flex items-center justify-center',
      bgColor,
      bgOpacity,
      sizeClasses[size],
      centered && 'mx-auto',
      className
    )}>
      {children}
    </div>
  );
} 