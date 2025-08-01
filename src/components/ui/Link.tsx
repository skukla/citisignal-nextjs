'use client';

import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';
import { isExternalUrl } from '@/lib/url';
import type { LinkProps } from '@/types/link';

/**
 * Link component for navigation with support for text, button, and icon styles.
 * 
 * @example
 * ```tsx
 * // Text link
 * <Link href="/about">About Us</Link>
 * 
 * // Primary button (default)
 * <Link href="/signup" variant="button">
 *   Get Started
 * </Link>
 * 
 * // Secondary button
 * <Link 
 *   href="/features" 
 *   variant="button"
 *   buttonStyle="secondary"
 * >
 *   Learn More
 * </Link>
 * 
 * // Custom button style
 * <Link 
 *   href="/contact" 
 *   variant="button"
 *   className="bg-green-500 text-white px-6 py-3"
 * >
 *   Contact Us
 * </Link>
 * 
 * // Icon link
 * <Link href="/cart" variant="icon" icon={CartIcon}>
 *   Cart
 * </Link>
 * ```
 */
export default function Link({
  href,
  children,
  variant = 'text',
  buttonStyle = 'primary',
  icon: Icon,
  iconPosition = 'left',
  className
}: LinkProps) {
  const classes = twMerge(
    'inline-flex items-center gap-2 transition-colors',
    
    // Text variant
    variant === 'text' && 'text-purple-600 hover:text-purple-700 underline-offset-4 hover:underline',
    
    // Icon variant
    variant === 'icon' && 'p-2 text-gray-700 hover:text-purple-600 rounded-full',
    
    // Button variant with styles
    variant === 'button' && [
      'rounded-lg px-6 py-3 font-medium',
      buttonStyle === 'primary' && 'bg-purple-600 text-white hover:bg-purple-700',
      buttonStyle === 'secondary' && 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      buttonStyle === 'outline' && 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
    ],
    
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon 
          className={twMerge(
            'w-5 h-5',
            variant === 'icon' && 'w-6 h-6'
          )} 
          aria-hidden 
        />
      )}
      {variant !== 'icon' ? children : null}
      {Icon && iconPosition === 'right' && (
        <Icon 
          className={twMerge(
            'w-5 h-5',
            variant === 'icon' && 'w-6 h-6'
          )} 
          aria-hidden 
        />
      )}
    </>
  );

  const isExternal = isExternalUrl(href);
  const linkProps = {
    className: classes,
    'aria-label': variant === 'icon' ? String(children) : undefined
  };

  return isExternal ? (
    <a href={href} {...linkProps}>
      {content}
    </a>
  ) : (
    <NextLink href={href} {...linkProps}>
      {content}
    </NextLink>
  );
}