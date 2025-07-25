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
      <h2 className={titleClasses}>
        {title}
      </h2>
      {description && (
        <p className={descriptionClasses}>
          {description}
        </p>
      )}
    </div>
  );
} 