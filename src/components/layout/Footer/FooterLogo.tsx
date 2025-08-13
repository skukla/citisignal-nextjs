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
  width = 180,
  height = 80,  // Maintains 2.24:1 aspect ratio
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
          style={{ 
            width: `${width}px`,
            height: `${height}px`
          }}
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