'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';

interface BreadcrumbItemProps {
  name: string;
  href?: string;
  isLast: boolean;
  showSeparator?: boolean;
  textColor?: ThemeTextColor;
  hoverColor?: ThemeTextColor;
  separatorColor?: ThemeTextColor;
  position?: number;
  className?: string;
}

export default function BreadcrumbItem({
  name,
  href,
  isLast,
  showSeparator = true,
  textColor = isLast ? 'text-gray-900' : 'text-gray-500',
  hoverColor = 'text-gray-700',
  separatorColor = 'text-gray-400',
  position,
  className
}: BreadcrumbItemProps) {
  return (
    <li
      className={twMerge('flex items-center', className)}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
    >
      {showSeparator && (
        <ChevronRightIcon className={twMerge('w-4 h-4 mx-2', separatorColor)} />
      )}
      {href && !isLast ? (
        <Link
          href={href}
          className={twMerge(
            'text-sm font-medium transition-colors',
            textColor,
            `hover:${hoverColor}`
          )}
        >
          {name}
        </Link>
      ) : (
        <span
          className={twMerge('text-sm font-medium', textColor)}
          aria-current={isLast ? 'page' : undefined}
        >
          {name}
        </span>
      )}
      {position && (
        <>
          <meta 
            itemProp="position" 
            content={String(position)} 
          />
          <meta 
            itemProp="name" 
            content={name} 
          />
          {href && <meta 
                    itemProp="item" 
                    content={href} />}
        </>
      )}
    </li>
  );
} 