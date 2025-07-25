'use client';

import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  label: string;
  value: number;
  showValue?: boolean;
  height?: 'sm' | 'md' | 'lg';
  barColor?: string;
  bgColor?: string;
  valueColor?: string;
  labelColor?: string;
  className?: string;
}

export default function ProgressBar({
  label,
  value,
  showValue = true,
  height = 'sm',
  barColor = 'bg-purple-600',
  bgColor = 'bg-gray-200',
  valueColor = 'text-purple-600',
  labelColor = 'text-gray-600',
  className
}: ProgressBarProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const containerClasses = twMerge(
    'space-y-1',
    className
  );

  const barContainerClasses = twMerge(
    'w-full rounded-full',
    bgColor,
    heightClasses[height]
  );

  const progressBarClasses = twMerge(
    'h-full rounded-full transition-all duration-300',
    barColor
  );

  return (
    <div className={containerClasses}>
      <div className="flex justify-between mb-1">
        <span className={labelColor}>
          {label}
        </span>
        {showValue && (
          <span className={twMerge('font-semibold', valueColor)}>
            {normalizedValue}%
          </span>
        )}
      </div>
      <div className={barContainerClasses}>
        <div
          className={progressBarClasses}
          style={{ width: `${normalizedValue}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${normalizedValue}%`}
        />
      </div>
    </div>
  );
} 