'use client';

import Link from 'next/link';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '@/types/button';
import Spinner from '@/components/ui/foundations/Spinner';

/**
 * Button component that handles both button and link variants.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click Me</Button>
 * 
 * // As a link
 * <Button href="/path">Go Home</Button>
 * 
 * // With loading state
 * <Button loading>Processing...</Button>
 * 
 * // Custom styling
 * <Button className="bg-red-500 hover:bg-red-600">
 *   Delete
 * </Button>
 * ```
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  href,
  loading = false,
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  // Base classes that rarely change
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2';
  
  // Dynamic classes based on variant/size/state
  const classes = twMerge(
    baseClasses,
    // Variants
    variant === 'primary' && 'bg-purple-600 text-white hover:bg-purple-700',
    variant === 'secondary' && 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    variant === 'outline' && 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    variant === 'ghost' && 'text-gray-700 hover:bg-gray-100',
    variant === 'yellow' && 'bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300',
    // Sizes
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3',
    size === 'lg' && 'px-8 py-4 text-lg',
    // States
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {LeftIcon && <LeftIcon className="w-5 h-5" aria-hidden />}
      {loading ? (
        <>
          <span className="sr-only">Loading</span>
          <Spinner size="sm" aria-hidden />
        </>
      ) : (
        children
      )}
      {RightIcon && <RightIcon className="w-5 h-5" aria-hidden />}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      onClick={!loading ? onClick : undefined}
      {...props}
    >
      {content}
    </button>
  );
}

export default memo(Button);