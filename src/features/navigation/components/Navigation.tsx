'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigation } from '../hooks/useNavigation';
import type { 
  NavigationRootProps, 
  NavigationListProps, 
  NavigationLinkProps,
  NavItem 
} from '../types/navigation.types';
import type { FC } from 'react';

// Create context
interface NavigationContextType {
  isMenuOpen: boolean;
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('Navigation components must be used within Navigation.Root');
  }
  return context;
}

/**
 * Root component for the Navigation system. Provides context and state management
 * for the navigation menu, including mobile menu state and backdrop handling.
 *
 * @example
 * <NavigationRoot isOpen={isMenuOpen} onToggle={toggleMenu} onClose={closeMenu}>
 *   <Header />
 * </NavigationRoot>
 */
export const NavigationRoot: FC<NavigationRootProps> = ({ 
  children, 
  className,
  isOpen,
  onToggle,
  onClose
}) => {
  const { isMenuOpen, closeMenu, menuRef } = useNavigation({
    isOpen,
    onToggle,
    onClose
  });

  return (
    <NavigationContext.Provider value={{ isMenuOpen, closeMenu, menuRef }}>
      <div className={className}>
        {children}
      </div>
    </NavigationContext.Provider>
  );
};

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
        'text-gray-700 hover:text-purple-600 focus:text-purple-600 font-medium transition-colors outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded',
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

/**
 * Navigation list component that renders either desktop or mobile navigation.
 * Handles responsive layout, animations, and accessibility requirements.
 *
 * @example
 * // Desktop navigation
 * <NavigationList items={navItems} variant="desktop" />
 *
 * @example
 * // Mobile navigation with slide-over menu
 * <NavigationList items={navItems} variant="mobile" />
 */
export const NavigationList: FC<NavigationListProps> = ({ items, variant, className }) => {
  const { isMenuOpen, menuRef, closeMenu } = useNavigationContext();
  
  const baseClass = variant === 'desktop' 
    ? 'flex items-center'
    : 'fixed inset-y-0 left-0 w-64 min-[1148px]:hidden bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50';

  return (
    <>
      {variant === 'mobile' && (
        // Backdrop - fade in/out
        <div 
          className={twMerge(
            "fixed inset-0 bg-black/20 transition-opacity duration-200 z-40",
            !isMenuOpen && "opacity-0 pointer-events-none"
          )}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <nav 
        ref={variant === 'mobile' ? menuRef : undefined}
        className={twMerge(
          baseClass,
          variant === 'mobile' && !isMenuOpen && '-translate-x-full',
          className
        )}
        role="navigation"
        aria-label={variant === 'mobile' ? 'Mobile navigation' : 'Desktop navigation'}
      >
        {variant === 'desktop' ? (
          // Desktop layout
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
        ) : (
          // Mobile layout
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
        )}
      </nav>
    </>
  );
};

/**
 * Navigation compound component for building responsive navigation menus.
 * Provides desktop and mobile navigation with proper accessibility support.
 *
 * @example
 * <Navigation.Root>
 *   <Navigation.List items={navItems} variant="desktop" />
 *   <Navigation.List items={navItems} variant="mobile" />
 * </Navigation.Root>
 */
const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  Link: NavigationLink
} as const;

// Default export of the namespace
export default Navigation; 