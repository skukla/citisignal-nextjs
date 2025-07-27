'use client';

import { twMerge } from 'tailwind-merge';
import SignalBars from './SignalBars';
import { usePhoneMockup } from '@/hooks/usePhoneMockup';
import type { 
  ThemeSize, 
  ThemeTextColor, 
  ThemeGradient, 
  ThemeGradientDirection,
  ThemeBgOpacity
} from '@/types/theme';

interface PhoneMockupProps {
  // Content
  title?: string;
  subtitle?: string;
  signalBars?: number;
  
  // Styling
  size?: ThemeSize;
  gradient?: ThemeGradient;
  gradientDirection?: ThemeGradientDirection;
  textColor?: ThemeTextColor;
  
  // Phone frame
  frameColor?: string;
  framePadding?: string;
  frameWidth?: string;
  
  // Signal bars
  barOpacity?: ThemeBgOpacity;
  minBarOpacity?: number;
  maxBarOpacity?: number;
  
  // Animation
  animate?: boolean;
  
  // Other
  className?: string;
}

export default function PhoneMockup({
  // Content
  title = '5G',
  subtitle = 'CitiSignal CONNECT',
  signalBars = 4,
  
  // Styling
  size = 'md',
  gradient = 'from-purple-600 to-purple-900',
  gradientDirection = 'to-br',
  textColor = 'text-white',
  
  // Phone frame
  frameColor = 'bg-gray-900',
  framePadding = 'p-4',
  frameWidth,
  
  // Signal bars
  barOpacity = 'bg-opacity-75',
  minBarOpacity = 0.4,
  maxBarOpacity = 1,
  
  // Animation
  animate = true,
  
  // Other
  className
}: PhoneMockupProps) {
  const { sizes } = usePhoneMockup(size);
  
  return (
    <div className={twMerge(
      'rounded-2xl mx-auto',
      frameColor,
      framePadding,
      frameWidth || sizes.container,
      className
    )}>
      <div className={twMerge(
        'rounded-xl flex flex-col',
        sizes.screen,
        `bg-gradient-${gradientDirection}`,
        gradient
      )}>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className={twMerge(
            'font-bold mb-2',
            sizes.title,
            textColor
          )}>
            {title}
          </div>
          <div className={twMerge(
            sizes.subtitle,
            textColor,
            'opacity-75 mb-8'
          )}>
            {subtitle}
          </div>
          <div className="w-full">
            <SignalBars
              count={signalBars}
              barClassName={sizes.bar}
              animate={animate}
              barOpacity={barOpacity}
              minOpacity={minBarOpacity}
              maxOpacity={maxBarOpacity}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 