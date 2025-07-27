'use client';

import { twMerge } from 'tailwind-merge';
import IconContainer from './IconContainer';
import CardContent from './CardContent';
import type { ThemeTextColor } from '@/types/theme';

interface BenefitCardProps {
  emoji: string;
  title: string;
  description: string;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  className?: string;
}

export default function BenefitCard({
  emoji,
  title,
  description,
  titleColor = 'text-white',
  descriptionColor = 'text-purple-100',
  className
}: BenefitCardProps) {
  return (
    <div className={twMerge('w-72', className)}>
      <IconContainer>
        <span className="text-2xl leading-none">{emoji}</span>
      </IconContainer>
      <CardContent
        title={title}
        description={description}
        titleColor={titleColor}
        descriptionColor={descriptionColor}
        centered
      />
    </div>
  );
} 