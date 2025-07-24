'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import IconLink from './IconLink';

interface CartButtonProps {
  itemCount: number;
  href?: string;
  badgeColor?: string;
  className?: string;
}

export default function CartButton({
  itemCount,
  href = '/cart',
  badgeColor = '#8821f4',
  className
}: CartButtonProps) {
  const badge = itemCount > 0 ? (
    <span
      className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      style={{ backgroundColor: badgeColor }}
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