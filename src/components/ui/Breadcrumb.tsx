'use client';

import { twMerge } from 'tailwind-merge';
import BreadcrumbItem from './BreadcrumbItem';
import HomeLink from './HomeLink';
import type { ThemeTextColor } from '@/types/theme';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  textColor?: ThemeTextColor;
  hoverColor?: ThemeTextColor;
  separatorColor?: ThemeTextColor;
  className?: string;
}

export default function Breadcrumb({
  items,
  textColor = 'text-gray-500',
  hoverColor = 'text-gray-700',
  separatorColor = 'text-gray-400',
  className
}: BreadcrumbProps) {
  return (
    <nav
      className={twMerge('flex', className)}
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center space-x-2" itemProp="itemListElement">
        <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
          <HomeLink
            textColor={textColor}
            hoverColor={hoverColor}
          />
          <meta itemProp="position" content="1" />
          <meta itemProp="name" content="Home" />
          <meta itemProp="item" content="/" />
        </li>

        {items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            name={item.name}
            href={item.href}
            isLast={index === items.length - 1}
            textColor={textColor}
            hoverColor={hoverColor}
            separatorColor={separatorColor}
            position={index + 2}
          />
        ))}
      </ol>
    </nav>
  );
} 