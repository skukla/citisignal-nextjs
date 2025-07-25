'use client';

import BenefitCard from './BenefitCard';
import BaseGrid from './layout/BaseGrid';
import type { GridColumns } from './layout/BaseGrid';

interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

interface BenefitGridProps {
  benefits: Benefit[];
  columns?: GridColumns;
  gap?: 'sm' | 'md' | 'lg';
  titleColor?: `text-${string}`;
  descriptionColor?: `text-${string}`;
  className?: string;
}

export default function BenefitGrid({
  benefits,
  columns = {
    sm: 1,
    md: 3,
    lg: 3
  },
  gap = 'md',
  titleColor,
  descriptionColor,
  className
}: BenefitGridProps) {
  return (
    <BaseGrid
      columns={columns}
      gap={gap}
      centered
      className={className}
    >
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          emoji={benefit.emoji}
          title={benefit.title}
          description={benefit.description}
          titleColor={titleColor}
          descriptionColor={descriptionColor}
        />
      ))}
    </BaseGrid>
  );
} 