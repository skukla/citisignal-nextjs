'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationLinkProps } from './Navigation.types';
import type { FC } from 'react';
import { useNavigationContext } from './NavigationRoot';

/**
 * Navigation link component that handles active state styling and menu closing.
 * Implements proper ARIA attributes for accessibility.
 *
 * @example
 * <NavigationLink href="/products">Products</NavigationLink>
 */
export const NavigationLink: FC<NavigationLinkProps> = ({ href, className, children }) => {
  const { closeMenu } = useNavigationContext();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={twMerge(
        'text-gray-700 hover:text-purple-600 focus:text-purple-600 font-medium transition-colors outline-none focus:outline-none',
        isActive && 'text-purple-600',
        className
      )}
      onClick={closeMenu}
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};