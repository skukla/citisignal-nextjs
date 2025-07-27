'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeBgOpacity } from '@/types/theme';

interface SignalBarsProps {
  count: number;
  barClassName?: string;
  animate?: boolean;
  minOpacity?: number;
  maxOpacity?: number;
  barOpacity?: ThemeBgOpacity;
  className?: string;
}

export default function SignalBars({
  count,
  barClassName,
  animate = true,
  minOpacity = 0.4,
  maxOpacity = 1,
  barOpacity = 'bg-opacity-75',
  className
}: SignalBarsProps) {
  return (
    <div className={twMerge(
      'flex items-end gap-1 h-20 w-full max-w-[8rem] mx-auto',
      className
    )}>
      {[...Array(count)].map((_, i) => {
        const heightPercent = 25 + ((i + 1) / count) * 75;
        return (
          <div 
            key={i} 
            className={twMerge(
              'flex-1 bg-white rounded-sm',
              barOpacity,
              animate && 'animate-pulse',
              barClassName
            )}
            style={{
              height: `${heightPercent}%`
            }}
          />
        );
      })}
    </div>
  );
} 