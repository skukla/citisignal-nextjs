'use client';

import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import type { PlanCardActionsProps } from './PlanCard.types';

/**
 * PlanCardActions component for displaying action buttons.
 * Provides Select Plan and Learn More buttons with customizable handlers.
 */
export default function PlanCardActions({
  onSelectPlan,
  onLearnMore,
  className
}: PlanCardActionsProps) {
  return (
    <div className={twMerge('space-y-2 mt-8 px-6 pb-6', className)}>
      <Button
        fullWidth
        variant="primary"
        className="py-2.5"
        onClick={onSelectPlan}
      >
        Select Plan
      </Button>
      <Button
        fullWidth
        variant="outline"
        className="py-2"
        onClick={onLearnMore}
      >
        Learn More
      </Button>
    </div>
  );
}