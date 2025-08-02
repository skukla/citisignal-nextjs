'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import type { AccountIconProps } from './Account.types';
import { useAccountContext } from './AccountRoot';

/**
 * Account icon component that displays the user's avatar when authenticated.
 * Uses the Button component for consistency.
 *
 * @example
 * <Account.Icon aria-label="User account" />
 */
export function AccountIcon({ className, ...props }: AccountIconProps) {
  const { toggle, isAuthenticated, user } = useAccountContext();

  return (
    <div className="relative">
      <Button
        onClick={toggle}
        variant="ghost"
        size="sm"
        leftIcon={UserIcon}
        className={className}
        aria-label="User account"
        {...props}
      />
      {isAuthenticated && user?.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="absolute inset-0 w-full h-full rounded-full"
        />
      )}
    </div>
  );
}