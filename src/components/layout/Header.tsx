'use client';

import { useState } from 'react';
import TopBar from './TopBar';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import HeaderActions from './HeaderActions';
import { mainNavItems, authLinks } from '@/data/navigation';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleSearch } = useGlobalSearch();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <TopBar
        announcement="Free shipping on orders over $99"
        supportPhone="1-800-CITI-SIG"
        authLinks={authLinks}
      />

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo
            src="/logo.svg"
            alt="CitiSignal"
          />

          {/* Desktop Navigation */}
          <NavigationMenu items={mainNavItems} variant="desktop" />

          {/* Search, Cart, and User Actions */}
          <HeaderActions
            cartCount={2}
            onSearch={handleSearch}
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <NavigationMenu items={mainNavItems} variant="mobile" />}
    </header>
  );
} 