'use client';

import { twMerge } from 'tailwind-merge';
import type { BaseComponentProps } from '@/types/ui';

interface FooterBottomProps extends BaseComponentProps {
  copyright: string;
  phone?: string;
  availability?: string;
  borderColor?: string;
}

export function FooterBottom({
  copyright,
  phone,
  availability,
  borderColor = 'border-gray-800',
  className
}: FooterBottomProps) {
  return (
    <div className={twMerge('border-t mt-8 pt-8', borderColor, className)}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          {copyright}
        </p>
        {(phone || availability) && (
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {phone && (
              <>
                <span className="text-gray-400 text-sm">Call: {phone}</span>
                {availability && <span className="text-gray-400 text-sm">|</span>}
              </>
            )}
            {availability && (
              <span className="text-gray-400 text-sm">{availability}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 