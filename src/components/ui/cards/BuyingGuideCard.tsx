'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Card from './Card';
import type { HeroIcon } from '@/types/hero-icons';

export interface BuyingGuideCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * BuyingGuideCard component for displaying buying guides with horizontal icon layout.
 * Built on the base Card component following our established architecture.
 * 
 * @example
 * ```tsx
 * <BuyingGuideCard
 *   icon={DevicePhoneMobileIcon}
 *   title="How to Choose Your Perfect Phone"
 *   description="From screen size to battery life, learn what features matter most..."
 *   href="/guides/choosing-phone"
 *   linkText="Read Guide"
 * />
 * ```
 */
function BuyingGuideCard({
  icon: IconComponent,
  title,
  description,
  href,
  linkText = 'Read More →',
  className,
  onClick
}: BuyingGuideCardProps) {
  const content = (
    <>
      {/* Icon Container */}
      <div className="w-20 h-20 rounded-lg bg-purple-50 flex-shrink-0 flex items-center justify-center">
        <IconComponent className="w-10 h-10 text-purple-600" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {description}
        </p>
        
        {/* Action Link */}
        <div className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
          {linkText}
        </div>
      </div>
    </>
  );

  // If href is provided, use Link component
  if (href && !onClick) {
    return (
      <Card 
        as={Link}
        href={href}
        interactive
        className={twMerge('group p-6 flex gap-6 items-start', className)}
      >
        {content}
      </Card>
    );
  }

  // Otherwise, use div with onClick
  return (
    <Card 
      as="div"
      interactive
      className={twMerge(
        'group p-6 flex gap-6 items-start',
        (onClick || href) && 'cursor-pointer',
        className
      )}
      onClick={onClick || (href ? () => window.open(href, '_blank', 'noopener,noreferrer') : undefined)}
    >
      {content}
    </Card>
  );
}

export default memo(BuyingGuideCard);