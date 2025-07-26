'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';

interface HomeLinkProps {
  textColor?: ThemeTextColor;
  hoverColor?: ThemeTextColor;
  className?: string;
}

export default function HomeLink({
  textColor = 'text-gray-500',
  hoverColor = 'text-gray-700',
  className
}: HomeLinkProps) {
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
      <HomeIcon className="w-4 h-4" />
      <span className="sr-only">Home</span>
    </Link>
  );
} 