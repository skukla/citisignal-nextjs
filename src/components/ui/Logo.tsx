'use client';

import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { FC } from 'react';
import type { LogoProps } from '@/types/ui';

/**
 * Logo component that renders a site logo with optional link wrapper.
 * Supports both linked and standalone logo images with customizable dimensions.
 *
 * Features:
 * - Next.js Image optimization
 * - Optional link wrapper
 * - Customizable dimensions
 * - Separate image and link styling
 *
 * @example
 * // Linked logo
 * <Logo
 *   src="/logo.svg"
 *   alt="Site Logo"
 *   width={160}
 *   height={50}
 *   href="/"
 * />
 *
 * @example
 * // Standalone logo
 * <Logo
 *   src="/logo.svg"
 *   alt="Site Logo"
 *   width={160}
 *   height={50}
 * />
 */
export const Logo: FC<LogoProps> = ({
  src,
  alt,
  width = 160,
  height = 50,
  className,
  href = "/",
  linkClassName
}) => {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );

  return href ? (
    <Link href={href} className={twMerge('flex items-center', linkClassName)}>
      {image}
    </Link>
  ) : image;
};

export default Logo; 