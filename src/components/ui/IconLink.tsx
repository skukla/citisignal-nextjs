'use client';

import Link from 'next/link';
import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconLinkProps {
  icon: ElementType;
  href: string;
  label: string;
  badge?: React.ReactNode;
  className?: string;
}

export default function IconLink({
  icon: Icon,
  href,
  label,
  badge,
  className
}: IconLinkProps) {
  const containerClasses = twMerge(
    'relative p-2 text-gray-700 hover:text-purple-600 transition-colors',
    className
  );

  return (
    <Link href={href} className={containerClasses} aria-label={label}>
      <Icon className="w-6 h-6" />
      {badge && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </Link>
  );
} 