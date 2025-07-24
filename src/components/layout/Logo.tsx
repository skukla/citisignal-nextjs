'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  href?: string;
  className?: string;
}

export default function Logo({
  src,
  alt = 'Logo',
  width = 160,
  height = 50,
  href = '/',
  className
}: LogoProps) {
  return (
    <div className="flex items-center">
      <Link href={href} className="flex items-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-contain ${className || ''}`}
        />
      </Link>
    </div>
  );
} 