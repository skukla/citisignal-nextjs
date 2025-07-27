'use client';

import Link from 'next/link';
import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ThemeSize, ThemeTextColor } from '@/types/theme';

interface IconLinkProps {
  icon: ElementType;
  href: string;
  label: string;
  size?: ThemeSize;
  textColor?: ThemeTextColor;
  hoverColor?: ThemeTextColor;
  badge?: React.ReactNode;
  className?: string;
}

export default function IconLink({
  icon: Icon,
  href,
  label,
  size = 'md',
  textColor = 'text-gray-700',
  hoverColor = 'text-purple-600',
  badge,
  className
}: IconLinkProps) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const paddingSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  return (
    <Link 
      href={href} 
      className={twMerge(
        'relative transition-colors',
        paddingSizes[size],
        textColor,
        `hover:${hoverColor}`,
        className
      )} 
      aria-label={label}
    >
      <Icon className={iconSizes[size]} />
      {badge && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </Link>
  );
} 