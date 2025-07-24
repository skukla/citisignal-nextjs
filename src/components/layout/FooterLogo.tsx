'use client';

import Image from 'next/image';

interface FooterLogoProps {
  description?: string;
  className?: string;
}

export default function FooterLogo({
  description,
  className = ''
}: FooterLogoProps) {
  return (
    <div className={className}>
      <div className="mb-4">
        <Image
          src="/logo-white.svg"
          alt="CitiSignal"
          width={160}
          height={50}
          className="object-contain"
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