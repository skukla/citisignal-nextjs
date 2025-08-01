'use client';

import { twMerge } from 'tailwind-merge';
import Button from '../Button';

interface PlanCardActionsProps {
  onSelectPlan?: () => void;
  onLearnMore?: () => void;
  selectButtonText?: string;
  learnMoreButtonText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * PlanCardActions component for displaying action buttons.
 * Provides Select Plan and Learn More buttons with customizable handlers.
 */
export default function PlanCardActions({
  onSelectPlan,
  onLearnMore,
  selectButtonText = 'Select Plan',
  learnMoreButtonText = 'Learn More',
  disabled = false,
  className
}: PlanCardActionsProps) {
  return (
    <div className={twMerge('space-y-2 mt-8 px-6 pb-6', className)}>
      <Button
        fullWidth
        variant="primary"
        className="py-2.5"
        onClick={onSelectPlan}
        disabled={disabled}
      >
        {selectButtonText}
      </Button>
      <Button
        fullWidth
        variant="outline"
        className="py-2"
        onClick={onLearnMore}
        disabled={disabled}
      >
        {learnMoreButtonText}
      </Button>
    </div>
  );
}