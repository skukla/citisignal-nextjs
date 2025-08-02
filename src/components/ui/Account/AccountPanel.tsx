'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { AccountPanelProps } from './Account.types';
import { useAccountContext } from './AccountRoot';
import { authenticatedMenuItems } from '@/data/account';

/**
 * Account panel component that displays user profile and authentication options.
 * Uses Button component for consistent styling.
 *
 * @example
 * <Account.Panel id="account-panel" />
 */
export function AccountPanel({ className }: AccountPanelProps) {
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
            <Button
              onClick={signOut}
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-gray-50"
            >
              Sign Out
            </Button>
          </nav>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Welcome</h2>
          <div className="space-y-2">
            <Button
              onClick={signIn}
              variant="primary"
              className="w-full"
            >
              Sign In
            </Button>
            <Button
              href="/signup"
              variant="outline"
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}