'use client';

import { useState, useCallback } from 'react';
import { NavigationRoot } from '@/components/ui/Navigation';
import type { BaseComponentProps } from '@/types/ui';

interface HeaderRootProps extends BaseComponentProps {
  children: React.ReactNode;
}

/**
 * Root component for Header compound component.
 * Provides NavigationRoot context and mobile menu state management.
 * 
 * @example
 * ```tsx
 * <Header.Root>
 *   <Header.Content />
 * </Header.Root>
 * ```
 */
export function HeaderRoot({ children }: HeaderRootProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <NavigationRoot 
      isOpen={isMenuOpen} 
      onToggle={toggleMenu} 
      onClose={closeMenu}
    >
      <header 
        className="bg-white shadow-sm border-b border-gray-200" 
        role="banner"
      >
        {children}
      </header>
    </NavigationRoot>
  );
}