'use client';

import { twMerge } from 'tailwind-merge';
import type { IconWrapperProps } from '@/types/ui';

/**
 * A wrapper component for icons that provides consistent sizing and accessibility attributes.
 * Use this component to standardize icon rendering across the application.
 *
 * @example
 * <IconWrapper icon={HomeIcon} size="md" aria-hidden />
 */
export default function IconWrapper({
  icon: Icon,
  size = 'md',
  className,
  'aria-hidden': ariaHidden = true
}: IconWrapperProps) {
  return (
    <Icon 
      className={twMerge(
        // Size variants
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-5 h-5',
        size === 'lg' && 'w-6 h-6',
        className
      )}
      aria-hidden={ariaHidden}
    />
  );
} 