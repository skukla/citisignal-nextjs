'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import type { HeroIcon } from '@/types/hero-icons';

export interface AccessoryCardProps {
  icon: HeroIcon;
  name: string;
  price?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * AccessoryCard component for displaying essential accessories with minimal design.
 * Built on the base Card component following our established architecture.
 * 
 * @example
 * ```tsx
 * <AccessoryCard
 *   icon={BoltIcon}
 *   name="Fast Chargers"
 *   price="From $29"
 *   onClick={() => router.push('/accessories/chargers')}
 * />
 * ```
 */
function AccessoryCard({
  icon: IconComponent,
  name,
  price,
  href,
  className,
  onClick
}: AccessoryCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      as="div"
      interactive
      className={twMerge(
        'group p-4 text-center cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      {/* Icon Container */}
      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
        <IconComponent className="w-12 h-12 text-gray-400 group-hover:text-purple-600 transition-colors" />
      </div>

      {/* Name */}
      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
        {name}
      </h3>

      {/* Price */}
      {price && (
        <p className="text-xs text-gray-500 group-hover:text-purple-500 transition-colors">
          {price}
        </p>
      )}
    </Card>
  );
}

export default memo(AccessoryCard);