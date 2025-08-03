'use client';

import { twMerge } from 'tailwind-merge';
import type { NavigationMobileProps, NavItem } from './Navigation.types';
import type { FC } from 'react';
import { useNavigationContext } from './NavigationRoot';
import { NavigationLink } from './NavigationLink';

/**
 * Mobile navigation component that renders a slide-over navigation menu.
 * Includes backdrop, animations, and mobile-optimized layout.
 *
 * @example
 * <NavigationMobile items={navItems} />
 */
export const NavigationMobile: FC<NavigationMobileProps> = ({ items, className }) => {
  const { isMenuOpen, menuRef, closeMenu } = useNavigationContext();

  return (
    <>
      {/* Backdrop - fade in/out with improved click handling */}
      <button
        className={twMerge(
          "fixed inset-0 bg-black/20 transition-opacity duration-200 z-40 cursor-default",
          !isMenuOpen && "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
        aria-hidden="true"
        tabIndex={-1}
      />
      
      {/* Mobile navigation panel */}
      <nav 
        ref={menuRef}
        className={twMerge(
          'fixed inset-y-0 left-0 w-64 min-[1148px]:hidden bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50',
          !isMenuOpen && '-translate-x-full',
          className
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div 
          className="h-full pt-16 pb-4 px-4"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="h-full overflow-y-auto">
            <div className="space-y-4">
              {items.map((item: NavItem) => (
                <NavigationLink 
                  key={item.href} 
                  href={item.href}
                  className="block py-2 text-lg"
                >
                  {item.label}
                </NavigationLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};