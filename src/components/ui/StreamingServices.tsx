import { twMerge } from 'tailwind-merge';
import type { ThemeTextColor, ThemeBgColor } from '@/types/theme';

interface StreamingServicesProps {
  services: string[];
  title?: string;
  titleColor?: ThemeTextColor;
  tagBgColor?: ThemeBgColor;
  tagTextColor?: ThemeTextColor;
  className?: string;
}

export default function StreamingServices({
  services,
  title = 'Streaming Included',
  titleColor = 'text-gray-900',
  tagBgColor = 'bg-purple-50',
  tagTextColor = 'text-purple-700',
  className
}: StreamingServicesProps) {
  if (!services.length) return null;

  return (
    <div className={className}>
      <h4 className={twMerge('font-semibold mb-2', titleColor)}>
        {title}
      </h4>
      <div className="flex flex-wrap gap-1">
        {services.map((service, index) => (
          <span
            key={index}
            className={twMerge(
              'text-[11px] font-medium px-1.5 py-0.5 rounded',
              tagBgColor,
              tagTextColor
            )}
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
} 