'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeSize } from '@/types/theme';

interface ComparisonRowProps {
  title: string;
  description: string;
  values: boolean[];
  size?: ThemeSize;
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  checkColor?: ThemeTextColor;
  xColor?: ThemeTextColor;
}

export default function ComparisonRow({
  title,
  description,
  values,
  size = 'md',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-500',
  checkColor = 'text-green-500',
  xColor = 'text-gray-300'
}: ComparisonRowProps) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className={twMerge('text-sm font-medium', titleColor)}>{title}</div>
        <div className={twMerge('text-sm', descriptionColor)}>{description}</div>
      </td>
      {values.map((isAvailable, index) => (
        <td key={index} className="py-4 px-6 text-center">
          {isAvailable ? (
            <CheckIcon className={twMerge(iconSizes[size], 'mx-auto', checkColor)} />
          ) : (
            <XMarkIcon className={twMerge(iconSizes[size], 'mx-auto', xColor)} />
          )}
        </td>
      ))}
    </tr>
  );
} 