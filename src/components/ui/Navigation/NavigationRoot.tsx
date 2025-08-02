'use client';

import { createContext, useContext } from 'react';
import { useNavigation } from './useNavigation';
import type { NavigationRootProps } from './Navigation.types';
import type { FC } from 'react';

// Create context
interface NavigationContextType {
  isMenuOpen: boolean;
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigationContext() {
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