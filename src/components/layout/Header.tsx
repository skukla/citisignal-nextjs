'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top utility bar - Black background with white text */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="text-sm text-white">
              Free shipping on orders over $99
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="text-sm text-white hover:text-purple-300 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm text-white hover:text-purple-300 transition-colors">
                Create Account
              </Link>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-300">Support:</span>
                <span className="text-sm font-medium text-white">1-800-CITI-SIG</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Using official CitiSignal logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/csLogo.png"
                alt="CitiSignal"
                width={160}
                height={50}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/phones" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Phones
            </Link>
            <Link href="/watches" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Watches
            </Link>
            <Link href="/accessories" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Accessories
            </Link>
            <Link href="/gift-cards" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Gift Cards
            </Link>
            <Link href="/plans" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Plans
            </Link>
            <Link href="/streaming" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Streaming
            </Link>
            <Link href="/internet-deals" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Internet Deals
            </Link>
          </nav>

          {/* Search, Cart, and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Search phones, plans, accessories..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ backgroundColor: '#8821f4' }}>
                2
              </span>
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-4">
            <Link href="/phones" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Phones
            </Link>
            <Link href="/watches" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Watches
            </Link>
            <Link href="/accessories" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Accessories
            </Link>
            <Link href="/gift-cards" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Gift Cards
            </Link>
            <Link href="/plans" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Plans
            </Link>
            <Link href="/streaming" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Streaming
            </Link>
            <Link href="/internet-deals" className="block text-gray-700 hover:text-purple-600 font-medium py-2">
              Internet Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 