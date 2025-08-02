'use client';

import { useState, useCallback } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import TopBar from '@/components/layout/TopBar';
import { Logo } from '@/components/ui/Logo';
import Search from '@/components/ui/Search';
import Cart from '@/components/ui/Cart';
import Account from '@/components/ui/Account';
import Navigation, { NavigationRoot } from '@/components/ui/Navigation';
import { navItems } from '@/data/navigation';

/**
 * Main application header component that provides navigation, search, cart, and account functionality.
 * Implements a responsive design with different layouts for desktop and mobile viewports.
 */
export default function Header() {
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
        <TopBar
          announcement="Free shipping on orders over $99"
          supportPhone="1-800-CITI-SIG"
          authLinks={[
            { href: '/signin', label: 'Sign In' },
            { href: '/signup', label: 'Create Account' }
          ]}
        />

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo
                src="/logo.svg"
                alt="CitiSignal"
                width={160}
                height={50}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden min-[1148px]:flex flex-1 justify-center max-w-3xl mx-auto px-4">
              <Navigation.Desktop items={navItems} />
            </div>

            {/* Search, Cart, and User Actions */}
            <div 
              className="flex items-center gap-1 sm:gap-2 min-[1148px]:gap-4 flex-shrink-0"
              role="group"
              aria-label="User actions"
            >
              {/* Search */}
              <div className="relative">
                <Search.Root>
                  {/* Desktop Search Trigger */}
                  <div className="hidden min-[1148px]:block">
                    <Search.Trigger 
                      aria-label="Search products"
                      aria-expanded={false}
                      aria-controls="search-panel"
                    />
                  </div>
                  {/* Mobile Search Trigger */}
                  <div className="min-[1148px]:hidden">
                    <Search.Trigger 
                      aria-label="Search products"
                      aria-expanded={false}
                      aria-controls="search-panel"
                      className="p-1 text-gray-700 hover:text-purple-600 transition-colors"
                    />
                  </div>
                  {/* Search Panel */}
                  <Search.Panel id="search-panel">
                    <div className="p-4 border-b border-gray-100">
                      <Search.Input 
                        aria-label="Search products"
                        aria-describedby="search-description"
                      />
                      <div id="search-description" className="sr-only">
                        Search for phones, plans, accessories and more
                      </div>
                    </div>
                    <Search.Results />
                  </Search.Panel>
                </Search.Root>
              </div>

              {/* Cart */}
              <div className="relative">
                <Cart.Root>
                  <Cart.Icon 
                    aria-label="Shopping cart"
                    aria-expanded={false}
                    aria-controls="cart-panel"
                  />
                  <Cart.Panel id="cart-panel" />
                </Cart.Root>
              </div>

              {/* User Account */}
              <div className="relative">
                <Account.Root>
                  <Account.Icon 
                    aria-label="User account"
                    aria-expanded={false}
                    aria-controls="account-panel"
                  />
                  <Account.Panel id="account-panel" />
                </Account.Root>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="min-[1148px]:hidden p-1 text-gray-700 hover:text-purple-600 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-haspopup="true"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Navigation.Mobile items={navItems} />
      </header>
    </NavigationRoot>
  );
}