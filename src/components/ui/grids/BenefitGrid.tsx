'use client';

import Grid from './Grid';
import BenefitCard from '@/components/ui/cards/BenefitCard';
import type { ResponsiveValue, GridGap } from '@/types/grid';

interface Benefit {
  emoji: string;
  title: string;
  description: string;
}

interface BenefitGridProps {
  benefits: Benefit[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
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
 *   columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
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