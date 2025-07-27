'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeSize } from '@/types/theme';

interface HomeLinkProps {
  textColor?: ThemeTextColor;
  hoverColor?: ThemeTextColor;
  iconSize?: ThemeSize;
  className?: string;
}

export default function HomeLink({
  textColor = 'text-gray-500',
  hoverColor = 'text-gray-700',
  iconSize = 'sm',
  className
}: HomeLinkProps) {
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <Link
      href="/"
      className={twMerge(
        'transition-colors',
        textColor,
        `hover:${hoverColor}`,
        className
      )}
    >
      <HomeIcon className={iconSizeClasses[iconSize]} />
      <span className="sr-only">Home</span>
    </Link>
  );
} 