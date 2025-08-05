'use client';

import { useState, useCallback } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeaderRoot } from './HeaderRoot';
import { HeaderTopBar } from './HeaderTopBar';
import Container from '@/components/ui/layout/Container';
import { Logo } from '@/components/ui/foundations/Logo';
import Navigation, { NavigationRoot } from '@/components/ui/layout/Navigation';
import Search from '@/components/ui/search/Search';
import { CartIcon } from '@/components/ui/layout/Cart/CartIcon';
import Account from '@/components/ui/layout/Account';
import Button from '@/components/ui/foundations/Button';
import { headerConfig } from '@/data/header';
import { navItems } from '@/data/navigation';

/**
 * Standard Header component with default content and layout.
 * Uses direct composition pattern matching Footer's approach.
 * 
 * For custom header layouts, use the Header compound components directly.
 */
export function StandardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <NavigationRoot isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
      <HeaderRoot>
        <HeaderTopBar />
        <Container>
          <div className="flex items-center justify-between gap-8 py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                width={headerConfig.logo.width}
                height={headerConfig.logo.height}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden min-[1148px]:flex flex-1 justify-center max-w-3xl mx-auto px-4">
              <Navigation.Desktop items={navItems} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4" role="group" aria-label="User actions">
              {/* Search */}
              <div className="relative">
                <Search.Root>
                  <Search.Trigger aria-label="Search products" />
                  <Search.Panel>
                    <div className="p-4 border-b border-gray-100">
                      <Search.Input aria-label="Search products" />
                    </div>
                    <Search.Results />
                  </Search.Panel>
                </Search.Root>
              </div>
              
              {/* Cart */}
              <div className="relative">
                <CartIcon aria-label="Shopping cart" />
              </div>
              
              {/* Account */}
              <div className="relative">
                <Account.Root>
                  <Account.Icon aria-label="User account" />
                  <Account.Panel />
                </Account.Root>
              </div>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                leftIcon={isMobileMenuOpen ? XMarkIcon : Bars3Icon}
                onClick={toggleMobileMenu}
                className="min-[1148px]:hidden p-1 text-gray-700 hover:text-purple-600 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-haspopup="true"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <Navigation.Mobile items={navItems} />
        </Container>
      </HeaderRoot>
    </NavigationRoot>
  );
}