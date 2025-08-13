'use client';

import Image from 'next/image';
import type { BaseComponentProps } from '@/types/ui';

interface FooterLogoProps extends BaseComponentProps {
  description?: string;
  width?: number;
  height?: number;
}

export function FooterLogo({
  description,
  width = 160,
  height = 50,
  className
}: FooterLogoProps) {
  return (
    <div className={className}>
      <div className="mb-4">
        <Image
          src="/logo-white.svg"
          alt="CitiSignal"
          width={width}
          height={height}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      {description && (
        <p className="text-gray-300 text-sm mb-4">
          {description}
        </p>
      )}
    </div>
  );
} 