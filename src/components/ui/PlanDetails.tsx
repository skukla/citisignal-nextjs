import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';

interface Detail {
  label: string;
  value: string;
}

interface PlanDetailsProps {
  details: Detail[];
  labelColor?: ThemeTextColor;
  valueColor?: ThemeTextColor;
  className?: string;
}

export default function PlanDetails({
  details,
  labelColor = 'text-gray-600',
  valueColor = 'text-gray-900',
  className
}: PlanDetailsProps) {
  return (
    <div className={twMerge('space-y-1.5 text-sm', className)}>
      {details.map((detail, index) => (
        <div 
          key={index} 
          className="flex justify-between"
          >
          <span className={labelColor}>{detail.label}</span>
          <span className={twMerge(valueColor, 'capitalize')}>
            {detail.value}
          </span>
        </div>
      ))}
    </div>
  );
} 