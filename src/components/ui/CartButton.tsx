'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import IconLink from './IconLink';
import { ThemeTextColor } from '@/types/theme';

interface CartButtonProps {
  itemCount: number;
  href?: string;
  badgeColor?: ThemeTextColor;
  className?: string;
}

export default function CartButton({
  itemCount,
  href = '/cart',
  badgeColor = 'text-purple-600',
  className
}: CartButtonProps) {
  const badge = itemCount > 0 ? (
    <span
      className={`${badgeColor} text-xs rounded-full w-5 h-5 flex items-center justify-center bg-white`}
    >
      {itemCount}
    </span>
  ) : null;

  return (
    <IconLink
      icon={ShoppingCartIcon}
      href={href}
      label="Shopping cart"
      badge={badge}
      className={className}
    />
  );
} 