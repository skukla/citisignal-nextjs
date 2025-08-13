'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';
import { useAuthContext } from './AuthContext';
import { accountMenuItems as authenticatedMenuItems } from '@/data/config/account';
import type { AccountMenuProps } from './Account.types';

export function AccountMenu({ className }: AccountMenuProps) {
  const { logout } = useAuthContext();

  return (
    <nav className={twMerge('py-2', className)}>
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
        onClick={() => logout()}
        variant="ghost"
        className="w-full justify-start gap-3 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-gray-50"
      >
        Sign Out
      </Button>
    </nav>
  );
}
