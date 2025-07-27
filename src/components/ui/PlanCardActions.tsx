import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { ButtonVariant, ButtonSize } from '@/types/theme';

interface PlanCardActionsProps {
  primaryText?: string;
  secondaryText?: string;
  primaryVariant?: ButtonVariant;
  secondaryVariant?: ButtonVariant;
  size?: ButtonSize;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export default function PlanCardActions({
  primaryText = 'Select Plan',
  secondaryText = 'Learn More',
  primaryVariant = 'primary',
  secondaryVariant = 'outline',
  size = 'md',
  onPrimaryClick,
  onSecondaryClick,
  className
}: PlanCardActionsProps) {
  return (
    <div className={twMerge('space-y-2', className)}>
      <Button
        variant={primaryVariant}
        size={size}
        onClick={onPrimaryClick}
        fullWidth
      >
        {primaryText}
      </Button>
      <Button
        variant={secondaryVariant}
        size={size}
        onClick={onSecondaryClick}
        fullWidth
      >
        {secondaryText}
      </Button>
    </div>
  );
} 