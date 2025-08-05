'use client';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface PhoneMockupProps {
  className?: string;
}

/**
 * A decorative phone mockup component for displaying CitiSignal branding.
 * Features animated signal bars and brand colors. Used primarily in hero sections.
 * 
 * @example
 * ```tsx
 * <PhoneMockup className="mx-auto" />
 * ```
 */
function PhoneMockup({ className }: PhoneMockupProps) {
  return (
    <div className={twMerge('bg-gray-900 rounded-2xl p-4 mx-auto w-48', className)}>
      <div className="rounded-xl h-80 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8821f4 0%, #6a1b9a 100%)' }}>
        <div className="text-center text-white">
          <div className="text-3xl font-bold mb-2">5G</div>
          <div className="text-sm opacity-75">CitiSignal CONNECT</div>
          <div className="grid grid-cols-4 gap-1 mt-4">
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white bg-opacity-20 h-3 rounded animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PhoneMockup); 