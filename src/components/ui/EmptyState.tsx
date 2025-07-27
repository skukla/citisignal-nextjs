'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { ButtonVariant, ThemeTextColor, ThemeBgColor, ThemeSize } from '@/types/theme';

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  size?: ThemeSize;
  iconBgColor?: ThemeBgColor;
  iconColor?: ThemeTextColor;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  buttonVariant?: ButtonVariant;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  size = 'md',
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-400',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  buttonVariant = 'primary',
  className
}: EmptyStateProps) {
  const containerSizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={twMerge(
      'text-center py-12',
      className
    )}>
      <div className={twMerge(
        'rounded-full flex items-center justify-center mx-auto mb-4',
        containerSizes[size],
        iconBgColor
      )}>
        <Icon className={twMerge(iconSizes[size], iconColor)} />
      </div>
      <h3 className={twMerge(
        'text-lg font-medium mb-2',
        titleColor
      )}>
        {title}
      </h3>
      <p className={twMerge(
        'mb-4',
        descriptionColor
      )}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          variant={buttonVariant}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
} 