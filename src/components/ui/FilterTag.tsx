'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeBgColor } from '@/types/theme';

interface FilterTagProps {
  label: string;
  onRemove: () => void;
  bgColor?: ThemeBgColor;
  textColor?: ThemeTextColor;
  buttonColor?: ThemeTextColor;
  buttonHoverColor?: ThemeTextColor;
  className?: string;
}

export default function FilterTag({
  label,
  onRemove,
  bgColor = 'bg-blue-50',
  textColor = 'text-blue-800',
  buttonColor = 'text-blue-600',
  buttonHoverColor = 'text-blue-800',
  className
}: FilterTagProps) {
  return (
    <div className={twMerge(
      'flex items-center justify-between px-3 py-1 rounded-full',
      bgColor,
      className
    )}>
      <span className={twMerge('text-sm', textColor)}>
        {label}
      </span>
      <button
        onClick={onRemove}
        className={twMerge(
          'ml-2 hover:' + buttonHoverColor,
          buttonColor
        )}
      >
        ×
      </button>
    </div>
  );
} 