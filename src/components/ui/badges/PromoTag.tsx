'use client';

import { twMerge } from 'tailwind-merge';

interface PromoTagProps {
  text: string;
  className?: string;
}

/**
 * A promotional tag component with dot indicator.
 * 
 * @example
 * ```tsx
 * <PromoTag text="Our lowest-priced plans ever" />
 * ```
 */
export default function PromoTag({
  text,
  className
}: PromoTagProps) {

  return (
    <div className={twMerge(
      'inline-flex items-center rounded-full text-sm font-medium px-4 py-2 bg-purple-800 bg-opacity-80 text-white',
      className
    )}>
      <span className="w-2 h-2 rounded-full mr-2 bg-yellow-400" />
      {text}
    </div>
  );
} 