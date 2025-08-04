'use client';

import Grid from './Grid';
import PlanCard from '../cards/PlanCard';
import type { GridProps } from '@/types/grid';
import type { Plan } from '@/types/commerce';

interface PlanGridProps {
  plans: Plan[];
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  className?: string;
  onSelectPlan?: (planId: string) => void;
  onLearnMore?: (planId: string) => void;
  onWishlistToggle?: (planId: string, saved: boolean) => void;
}

export default function PlanGrid({
  plans,
  columns = {
    sm: 1,
    md: 2,
    lg: 3
  },
  gap = 'lg',
  className,
  onSelectPlan,
  onLearnMore,
  onWishlistToggle
}: PlanGridProps) {
  return (
    <Grid
      columns={columns}
      gap={gap}
      className={className}
    >
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onSelectPlan={onSelectPlan}
          onLearnMore={onLearnMore}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </Grid>
  );
}