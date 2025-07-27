import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor } from '@/types/theme';
import type { CoreFeature } from '@/types/features';

interface CoreFeaturesProps {
  features: CoreFeature[];
  valueColor?: ThemeTextColor;
  labelColor?: ThemeTextColor;
  className?: string;
}

export default function CoreFeatures({
  features,
  valueColor = 'text-gray-900',
  labelColor = 'text-gray-600',
  className
}: CoreFeaturesProps) {
  return (
    <div className={twMerge(
      'grid grid-cols-3 gap-2 text-center h-[52px]',
      className
    )}>
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="flex flex-col justify-center"
        >
          <div className={twMerge('text-sm font-bold', valueColor)}>
            {feature.value}
          </div>
          <div className={twMerge('text-[11px] mt-0.5', labelColor)}>
            {feature.label}
          </div>
        </div>
      ))}
    </div>
  );
} 