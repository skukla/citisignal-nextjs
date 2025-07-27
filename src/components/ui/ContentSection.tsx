'use client';

import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { ButtonVariant, ButtonSize, ThemeTextColor, ThemeBgColor, ThemeSpacing } from '@/types/theme';

interface ContentSectionProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  bgColor?: ThemeBgColor;
  borderColor?: string;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  spacing?: ThemeSpacing;
  className?: string;
}

export default function ContentSection({
  title,
  description,
  actionLabel,
  actionHref,
  children,
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  bgColor = 'bg-white',
  borderColor = 'border-gray-100',
  buttonVariant = 'secondary',
  buttonSize = 'sm',
  spacing = 'md',
  className
}: ContentSectionProps) {
  const marginClasses = {
    xs: 'mb-2',
    sm: 'mb-3',
    md: 'mb-4',
    lg: 'mb-6',
    xl: 'mb-8'
  };

  const paddingClasses = {
    xs: 'p-4',
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
    xl: 'p-12'
  };

  return (
    <section className={twMerge(
      bgColor,
      'rounded-2xl shadow-sm border',
      paddingClasses[spacing],
      borderColor,
      className
    )}>
      <div className={twMerge(
        'flex justify-between items-center',
        marginClasses[spacing]
      )}>
        <div>
          <h2 className={twMerge('text-2xl font-bold', titleColor)}>
            {title}
          </h2>
          {description && (
            <p className={twMerge('mt-2', descriptionColor)}>
              {description}
            </p>
          )}
        </div>
        {actionLabel && actionHref && (
          <Button
            href={actionHref}
            variant={buttonVariant}
            size={buttonSize}
          >
            {actionLabel}
          </Button>
        )}
      </div>
      {children}
    </section>
  );
} 