'use client';

import { twMerge } from 'tailwind-merge';

interface PromoTagProps {
  text: string;
  dotColor?: string;
  bgColor?: string;
  textColor?: string;
  padding?: string;
  className?: string;
}

export default function PromoTag({
  text,
  dotColor = 'bg-yellow-400',
  bgColor = 'bg-purple-800 bg-opacity-80',
  textColor = 'text-white',
  padding = 'px-4 py-2',
  className
}: PromoTagProps) {
  const containerClasses = twMerge(
    'inline-flex items-center rounded-full text-sm font-medium',
    padding,
    bgColor,
    textColor,
    className
  );

  const dotClasses = twMerge(
    'w-2 h-2 rounded-full mr-2',
    dotColor
  );

  return (
    <div className={containerClasses}>
      <span className={dotClasses} />
      {text}
    </div>
  );
} 