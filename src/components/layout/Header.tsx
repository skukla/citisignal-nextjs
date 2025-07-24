'use client';

import { useState } from 'react';
import TopBar from './TopBar';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import HeaderActions from './HeaderActions';

const navItems = [
  { href: '/phones', label: 'Phones' },
  { href: '/watches', label: 'Watches' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/plans', label: 'Plans' },
  { href: '/streaming', label: 'Streaming' },
  { href: '/internet-deals', label: 'Internet Deals' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (value: string) => {
    // TODO: Implement search functionality
    console.log('Search:', value);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
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
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo
            src="/logo.svg"
            alt="CitiSignal"
          />

          {/* Desktop Navigation */}
          <NavigationMenu items={navItems} variant="desktop" />

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
      {isMenuOpen && <NavigationMenu items={navItems} variant="mobile" />}
    </header>
  );
} 