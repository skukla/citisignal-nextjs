'use client';

import Grid from './Grid';
import IconBenefitCard from '@/components/ui/cards/IconBenefitCard';
import type { GridGap, ResponsiveValue } from '@/types/grid';
import type { HeroIcon } from '@/types/hero-icons';

interface IconBenefit {
  icon: HeroIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

interface IconBenefitGridProps {
  benefits: IconBenefit[];
  columns?: ResponsiveValue<number>;
  gap?: GridGap;
  className?: string;
}

/**
 * A grid component for displaying icon benefit cards in a responsive layout.
 * Built on the base Grid component.
 *
 * @example
 * ```tsx
 * <IconBenefitGrid
 *   benefits={benefits}
 *   columns={{ sm: 1, md: 2, lg: 4 }}
 *   gap="lg"
 * />
 * ```
 */
export default function IconBenefitGrid({
  benefits,
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 'lg',
  className
}: IconBenefitGridProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {benefits.map((benefit, index) => (
        <IconBenefitCard
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          iconColor={benefit.iconColor}
          iconBgColor={benefit.iconBgColor}
        />
      ))}
    </Grid>
  );
}