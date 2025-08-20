'use client';

import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import type { AccountIconProps } from './Account.types';
import { useAccountContext } from './AccountContext';

/**
 * Account icon component that displays the user's avatar when authenticated.
 * Uses the Button component for consistency.
 *
 * @example
 * <Account.Icon aria-label="User account" />
 */
export function AccountIcon({ ...props }: AccountIconProps) {
  const { toggle, isAuthenticated, user } = useAccountContext();

  return (
    <div className="relative">
      <Button
        onClick={toggle}
        variant="ghost"
        size="sm"
        leftIcon={UserIcon}
        className="focus:ring-0 focus:ring-offset-0"
        aria-label="User account"
        {...props}
      />
      {isAuthenticated && user?.avatarUrl && (
        <Image
          src={user.avatarUrl}
          alt={user.name || 'User avatar'}
          fill
          className="rounded-full object-cover"
          sizes="32px"
        />
      )}
    </div>
  );
}