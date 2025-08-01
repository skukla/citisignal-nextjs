'use client';

import Grid from './Grid';
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
  className?: string;
}

/**
 * A grid component for displaying benefit cards in a responsive layout.
 * Built on the base Grid component.
 *
 * @example
 * ```tsx
 * <BenefitGrid
 *   benefits={benefits}
 *   columns={{ sm: 1, md: 3, lg: 4 }}
 *   gap="md"
 * />
 * ```
 */
export default function BenefitGrid({
  benefits,
  columns = {
    sm: 1,
    md: 3
  },
  gap = 'md',
  className
}: BenefitGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          emoji={benefit.emoji}
          title={benefit.title}
          description={benefit.description}
        />
      ))}
    </Grid>
  );
} 