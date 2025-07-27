'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeBgColor, ThemeBgOpacity, ThemeSize } from '@/types/theme';

interface IconContainerProps {
  children: React.ReactNode;
  size?: ThemeSize;
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

  return (
    <div className={twMerge(
      'rounded-full flex items-center justify-center',
      `${bgColor} ${bgOpacity}`,
      sizeClasses[size],
      centered && 'mx-auto',
      className
    )}>
      {children}
    </div>
  );
} 