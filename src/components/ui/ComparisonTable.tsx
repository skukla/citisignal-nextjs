'use client';

import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeTextSize } from '@/types/theme';

export interface ComparisonHeader {
  label: React.ReactNode;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

interface ComparisonTableProps {
  headers: ComparisonHeader[];
  children: React.ReactNode;
  size?: ThemeTextSize;
  headerColor?: ThemeTextColor;
  borderColor?: string;
  className?: string;
}

export default function ComparisonTable({
  headers,
  children,
  size = 'sm',
  headerColor = 'text-gray-900',
  borderColor = 'border-gray-200',
  className
}: ComparisonTableProps) {
  const textSizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={twMerge('border-b', borderColor)}>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={twMerge(
                    'py-4 px-6 font-semibold',
                    textSizes[size],
                    headerColor,
                    header.align === 'center' ? 'text-center' : 'text-left',
                    `min-w-[${header.width || (index === 0 ? 280 : 140)}px]`
                  )}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={twMerge('divide-y', borderColor)}>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
} 