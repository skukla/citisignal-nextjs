'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';

export interface TipCardProps {
  category: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * TipCard component for displaying tips and tricks with category headers.
 * Built on the base Card component following our established architecture.
 * 
 * @example
 * ```tsx
 * <TipCard
 *   category="Photography"
 *   title="Master Your Phone's Camera"
 *   description="Pro tips for taking stunning photos with any smartphone camera."
 *   onClick={() => router.push(`/tips/${tip.slug}`)}
 * />
 * ```
 */
function TipCard({
  category,
  title,
  description,
  href,
  className,
  onClick
}: TipCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      as="article"
      interactive
      className={twMerge(
        'group p-6 cursor-pointer h-full',
        className
      )}
      onClick={handleClick}
    >
      {/* Category Tag */}
      <div className="text-sm font-medium text-purple-600 mb-2 uppercase tracking-wide">
        {category}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3">
        {description}
      </p>

      {/* Read More Indicator */}
      <div className="mt-4 pt-2 border-t border-gray-100 group-hover:border-purple-200 transition-colors">
        <span className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors font-medium">
          Click to read more →
        </span>
      </div>
    </Card>
  );
}

export default memo(TipCard);