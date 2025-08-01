'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import type {
  AccountContextValue,
  AccountRootProps,
  AccountIconProps,
  AccountPanelProps,
  AccountComponent
} from '../types/account.types';
import { useAccount } from '../hooks/useAccount';
import { authenticatedMenuItems } from '../data/account';

// Create context
const AccountContext = createContext<AccountContextValue | null>(null);

function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('Account components must be used within Account.Root');
  }
  return context;
}

/**
 * Root component for the Account feature. Provides context and state management
 * for user authentication and account functionality.
 *
 * @example
 * <Account.Root>
 *   <Account.Icon />
 *   <Account.Panel />
 * </Account.Root>
 */
const AccountRoot = ({ children, className }: AccountRootProps) => {
  const accountState = useAccount();

  return (
    <AccountContext.Provider value={accountState}>
      <div className={className}>
        {children}
      </div>
    </AccountContext.Provider>
  );
};

/**
 * Account icon component that displays the user's avatar when authenticated.
 * Handles toggling the account panel visibility.
 *
 * @example
 * <Account.Icon aria-label="User account" />
 */
const AccountIcon = ({ className }: AccountIconProps) => {
  const { toggle, isAuthenticated, user } = useAccountContext();

  return (
    <button
      onClick={toggle}
      className={twMerge(
        'relative p-2 text-gray-700 hover:text-purple-600 transition-colors cursor-pointer',
        className
      )}
    >
      <UserIcon className="w-6 h-6" />
      {isAuthenticated && user?.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="absolute inset-0 w-full h-full rounded-full"
        />
      )}
    </button>
  );
};

/**
 * Account panel component that displays user profile and authentication options.
 * Shows different content for authenticated and unauthenticated states.
 *
 * Features:
 * - User profile with avatar
 * - Account management menu
 * - Sign in/out functionality
 * - Account creation link
 *
 * @example
 * <Account.Panel id="account-panel" />
 */
const AccountPanel = ({ className }: AccountPanelProps) => {
  const { isOpen, panelRef, isAuthenticated, signIn, user, signOut } = useAccountContext();

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {isAuthenticated ? (
        <div>
          {/* Profile Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-sm text-gray-700">{user?.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <nav className="py-2">
            {authenticatedMenuItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.icon && <item.icon className="w-5 h-5 text-gray-500" />}
                {item.label}
              </Link>
            ))}
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </nav>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Welcome</h2>
          <div className="space-y-2">
            <button
              onClick={signIn}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
            >
              Sign In
            </button>
            <Link
              href="/signup"
              className="block w-full px-4 py-2 text-center border border-gray-300 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Account compound component for building user account functionality.
 * Provides a complete account interface with authentication and profile management.
 *
 * Features:
 * - Authentication state management
 * - User profile display
 * - Avatar support
 * - Account menu navigation
 * - Sign in/out functionality
 * - Account creation flow
 *
 * @example
 * <Account.Root>
 *   <Account.Icon aria-label="User account" />
 *   <Account.Panel id="account-panel" />
 * </Account.Root>
 */
const Account = {
  Root: AccountRoot,
  Icon: AccountIcon,
  Panel: AccountPanel
} as const satisfies AccountComponent;

// Export
export default Account;