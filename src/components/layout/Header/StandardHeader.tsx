'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
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
import { headerConfig } from '@/data/config/header';
import { useCategoryNavigation } from '@/hooks/navigation';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Standard Header component with default content and layout.
 * Uses direct composition pattern matching Footer's approach.
 * 
 * For custom header layouts, use the Header compound components directly.
 */
export function StandardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // First check NavigationProvider for navigation data
  const { navigation: contextNav, isStale, setNavigation, isLoadingFromUnified } = useNavigation();
  
  // Only fetch if no navigation in context or if it's stale, AND not loading from unified query
  const shouldFetch = (!contextNav || isStale()) && !isLoadingFromUnified;
  const { data: categoryNav, loading: navLoading } = useCategoryNavigation({
    enabled: shouldFetch
  });
  
  // Update context when we fetch new data
  useEffect(() => {
    if (categoryNav && shouldFetch) {
      setNavigation(categoryNav, 'standalone');
    }
  }, [categoryNav, shouldFetch, setNavigation]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  
  // Use context navigation if available, otherwise use fetched data
  const navItems = useMemo(() => {
    const navData = contextNav || categoryNav;
    return navData?.headerNav || [];
  }, [contextNav, categoryNav]);

  return (
    <NavigationRoot isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} onClose={closeMobileMenu}>
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
              {navLoading && navItems.length === 0 ? (
                // Show skeleton only when actually loading and no data yet
                <div className="flex items-center space-x-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  ))}
                </div>
              ) : (
                <Navigation.Desktop items={navItems} />
              )}
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

        </Container>
      </HeaderRoot>
      
      {/* Mobile Navigation - Outside of Container for full-width slide */}
      <Navigation.Mobile items={navItems} />
    </NavigationRoot>
  );
}