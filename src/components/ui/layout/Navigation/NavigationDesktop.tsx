'use client';

import { twMerge } from 'tailwind-merge';
import type { NavigationDesktopProps, NavItem } from './Navigation.types';
import type { FC } from 'react';
import { NavigationLink } from './NavigationLink';

/**
 * Desktop navigation component that renders a horizontal navigation bar.
 * Optimized for desktop layouts with simple flex positioning.
 *
 * @example
 * <NavigationDesktop items={navItems} />
 */
export const NavigationDesktop: FC<NavigationDesktopProps> = ({ items, className }) => {
  return (
    <nav 
      className={twMerge('flex items-center', className)}
      role="navigation"
      aria-label="Desktop navigation"
      data-inspector-source="commerce"
      data-inspector-type="navigation-desktop"
    >
      <div 
        role="menubar" 
        className="flex items-center w-full justify-between"
      >
        {items.map((item: NavItem) => (
          <NavigationLink 
            key={item.href} 
            href={item.href}
            className="whitespace-nowrap px-3"
          >
            {item.label}
          </NavigationLink>
        ))}
      </div>
    </nav>
  );
};