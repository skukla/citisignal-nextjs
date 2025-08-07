'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { AccountProfileProps } from './Account.types';

export function AccountProfile({ user, className }: AccountProfileProps) {
  return (
    <div className={twMerge('p-4 border-b border-gray-100', className)}>
      <div className="flex items-center gap-3">
        {user.avatarUrl ? (
          <div className="w-10 h-10 relative">
            <Image
              src={user.avatarUrl}
              alt={user.name || 'User avatar'}
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-medium">
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-700">{user.email}</div>
        </div>
      </div>
    </div>
  );
}
