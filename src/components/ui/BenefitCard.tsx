'use client';

import { twMerge } from 'tailwind-merge';
import Badge from './Badge';

interface BenefitCardProps {
  emoji: string;
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  badgeOpacity?: number;
  className?: string;
}

export default function BenefitCard({
  emoji,
  title,
  description,
  titleColor = 'text-white',
  descriptionColor = 'text-purple-100',
  badgeOpacity = 20,
  className
}: BenefitCardProps) {
  return (
    <div className={twMerge('text-center max-w-[250px] mx-auto', className)}>
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl leading-none">{emoji}</span>
      </div>
      <h3 className={twMerge('text-base font-semibold mb-1', titleColor)}>
        {title}
      </h3>
      <p className={twMerge('text-sm leading-relaxed', descriptionColor)}>
        {description}
      </p>
    </div>
  );
} 