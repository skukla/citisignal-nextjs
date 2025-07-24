'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import CartButton from '@/components/ui/CartButton';
import SearchInput from '@/components/ui/SearchInput';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top utility bar - Black background with white text */}
      <div className="bg-black border-b border-gray-800">
        <div className="section-container py-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-white">
              Free shipping on orders over $99
            </div>
            <div className="flex items-center gap-4">
              <Link href="/signin" className="text-sm text-white hover:text-primary-300 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm text-white hover:text-primary-300 transition-colors">
                Create Account
              </Link>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-300">Support:</span>
                <span className="text-sm font-medium text-white">1-800-CITI-SIG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="section-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="CitiSignal"
                width={160}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/phones" className="nav-link">Phones</Link>
            <Link href="/watches" className="nav-link">Watches</Link>
            <Link href="/accessories" className="nav-link">Accessories</Link>
            <Link href="/gift-cards" className="nav-link">Gift Cards</Link>
            <Link href="/plans" className="nav-link">Plans</Link>
            <Link href="/streaming" className="nav-link">Streaming</Link>
            <Link href="/internet-deals" className="nav-link">Internet Deals</Link>
          </nav>

          {/* Search, Cart, and User Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={clsx(
                  'icon-button',
                  isSearchOpen && 'text-primary-600'
                )}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 card z-50">
                  <div className="p-4">
                    <SearchInput
                      value={searchQuery}
                      onChange={setSearchQuery}
                      onSubmit={handleSearch}
                      placeholder="Search phones, plans, accessories..."
                      autoFocus
                      color="purple"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <CartButton />

            {/* User Account */}
            <Link
              href="/account"
              className="icon-button"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Account</span>
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'lg:hidden icon-button',
                isMenuOpen && 'text-primary-600'
              )}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="section-container py-4 space-y-4">
            <Link href="/phones" className="block nav-link py-2">Phones</Link>
            <Link href="/watches" className="block nav-link py-2">Watches</Link>
            <Link href="/accessories" className="block nav-link py-2">Accessories</Link>
            <Link href="/gift-cards" className="block nav-link py-2">Gift Cards</Link>
            <Link href="/plans" className="block nav-link py-2">Plans</Link>
            <Link href="/streaming" className="block nav-link py-2">Streaming</Link>
            <Link href="/internet-deals" className="block nav-link py-2">Internet Deals</Link>
          </nav>
        </div>
      )}
    </header>
  );
} 