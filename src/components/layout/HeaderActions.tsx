'use client';

import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/components/ui/SearchBar';
import CartButton from '@/components/ui/CartButton';
import IconLink from '@/components/ui/IconLink';
import Button from '@/components/ui/Button';

interface HeaderActionsProps {
  cartCount: number;
  onSearch: (value: string) => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  className?: string;
}

export default function HeaderActions({
  cartCount,
  onSearch,
  isMenuOpen,
  onMenuToggle,
  className
}: HeaderActionsProps) {
  return (
    <div className={`flex items-center space-x-4 ${className || ''}`}>
      {/* Search */}
      <SearchBar
        placeholder="Search phones, plans, accessories..."
        onSearch={onSearch}
        autoFocus
      />

      {/* Cart */}
      <CartButton itemCount={cartCount} />

      {/* User Account */}
      <IconLink
        icon={UserIcon}
        href="/account"
        label="User account"
      />

      {/* Mobile Menu Button */}
      <Button
        onClick={onMenuToggle}
        variant="ghost"
        size="sm"
        className="lg:hidden text-gray-700 hover:text-purple-600 hover:bg-transparent p-2"
        leftIcon={isMenuOpen ? XMarkIcon : Bars3Icon}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      />
    </div>
  );
} 