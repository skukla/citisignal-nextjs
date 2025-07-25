'use client';

import { twMerge } from 'tailwind-merge';
import BenefitCard from './BenefitCard';

interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

interface BenefitGridProps {
  benefits: Benefit[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  titleColor?: string;
  descriptionColor?: string;
  badgeOpacity?: number;
  className?: string;
}

export default function BenefitGrid({
  benefits,
  columns = {
    sm: 1,
    md: 3
  },
  gap = 'md',
  titleColor,
  descriptionColor,
  badgeOpacity,
  className
}: BenefitGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const getColumnsClass = () => {
    const classes = [];
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    return classes.join(' ');
  };

  return (
    <div className={twMerge(
      'grid',
      getColumnsClass(),
      gapClasses[gap],
      className
    )}>
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          emoji={benefit.emoji}
          title={benefit.title}
          description={benefit.description}
          titleColor={titleColor}
          descriptionColor={descriptionColor}
          badgeOpacity={badgeOpacity}
        />
      ))}
    </div>
  );
} 