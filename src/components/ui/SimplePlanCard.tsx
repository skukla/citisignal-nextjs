'use client';

import { twMerge } from 'tailwind-merge';

interface SimplePlanCardProps {
  price: string;
  title: string;
  subtitle?: string;
  priceColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
}

export default function SimplePlanCard({
  price,
  title,
  subtitle,
  priceColor = 'text-purple-600',
  titleColor = 'text-gray-600',
  subtitleColor = 'text-gray-500',
  className
}: SimplePlanCardProps) {
  return (
    <div className={twMerge('text-center', className)}>
      <div className={twMerge('text-2xl font-bold', priceColor)}>
        {price}
      </div>
      <div className={twMerge('text-sm', titleColor)}>
        {title}
      </div>
      {subtitle && (
        <div className={twMerge('text-xs mt-1', subtitleColor)}>
          {subtitle}
        </div>
      )}
    </div>
  );
} 