'use client';

import { twMerge } from 'tailwind-merge';

interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  titleSize?: 'sm' | 'md' | 'lg';
  descriptionSize?: 'sm' | 'md' | 'lg';
  titleColor?: string;
  descriptionColor?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  centered = false,
  titleSize = 'lg',
  descriptionSize = 'md',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  action,
  className
}: SectionHeaderProps) {
  const titleSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl'
  };

  const descriptionSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const containerClasses = twMerge(
    centered && 'text-center',
    'mb-16',
    className
  );

  const contentClasses = twMerge(
    action && !centered && 'flex justify-between items-end gap-8'
  );

  const textClasses = twMerge(
    action && !centered && 'flex-1'
  );

  const titleClasses = twMerge(
    titleSizes[titleSize],
    'font-bold mb-4',
    titleColor
  );

  const descriptionClasses = twMerge(
    descriptionSizes[descriptionSize],
    centered && 'max-w-3xl mx-auto',
    descriptionColor
  );

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className={textClasses}>
          <h2 className={titleClasses}>
            {title}
          </h2>
          {description && (
            <p className={descriptionClasses}>
              {description}
            </p>
          )}
        </div>
        {action && !centered && action}
      </div>
      {action && centered && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
} 