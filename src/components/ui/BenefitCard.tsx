'use client';

import { twMerge } from 'tailwind-merge';

interface BenefitCardProps {
  emoji: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * A card component for displaying benefit information with emoji icon.
 * 
 * @example
 * ```tsx
 * <BenefitCard 
 *   emoji="📱"
 *   title="Exclusive Deals"
 *   description="First access to limited-time offers"
 * />
 * ```
 */
export default function BenefitCard({
  emoji,
  title,
  description,
  className
}: BenefitCardProps) {
  return (
    <div className={twMerge('text-center max-w-[250px] mx-auto', className)}>
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl leading-none">{emoji}</span>
      </div>
      <h3 className="text-base font-semibold mb-1 text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-purple-100">
        {description}
      </p>
    </div>
  );
} 