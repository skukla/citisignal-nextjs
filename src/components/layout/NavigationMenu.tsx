'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  items: NavItem[];
  variant: 'desktop' | 'mobile';
  className?: string;
}

export default function NavigationMenu({ items, variant, className }: NavigationMenuProps) {
  if (variant === 'desktop') {
    return (
      <nav className={twMerge('hidden lg:flex items-center space-x-8', className)}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div className={twMerge('lg:hidden bg-white border-t border-gray-200', className)}>
      <nav className="px-4 py-4 space-y-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-gray-700 hover:text-purple-600 font-medium py-2"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
} 