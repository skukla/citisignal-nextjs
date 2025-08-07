'use client';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Button from '@/components/ui/foundations/Button';
import { useAccountContext } from './AccountContext';
import { AccountProfile } from './AccountProfile';
import { AccountMenu } from './AccountMenu';
import type { AccountPanelProps } from './Account.types';

export function AccountPanel({ className }: AccountPanelProps) {
  const { isOpen, panelRef, close, isAuthenticated, user } = useAccountContext();

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
      {isAuthenticated && user ? (
        <div>
          <AccountProfile user={user} />
          <AccountMenu />
        </div>
      ) : (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Welcome</h2>
          <div className="space-y-2">
            <Link href="/account/auth" onClick={close} className="block">
              <Button variant="primary" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/account/auth?mode=signup" onClick={close} className="block">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}