'use client';

import { twMerge } from 'tailwind-merge';
import CheckmarkFeatureList from './CheckmarkFeatureList';
import LinkButton from './LinkButton';
import type { ThemeGradient, ThemeTextColor, LinkButtonVariant, ButtonSize, ThemeSize } from '@/types/theme';

interface Feature {
  title: string;
  description: string;
}

interface FeaturedToolProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  features: Feature[];
  titleColor?: ThemeTextColor;
  descriptionColor?: ThemeTextColor;
  buttonVariant?: LinkButtonVariant;
  buttonSize?: ButtonSize;
  featureSize?: ThemeSize;
  className?: string;
  gradient?: ThemeGradient;
}

export default function FeaturedTool({
  title,
  description,
  buttonText,
  buttonHref,
  features,
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  buttonVariant = 'primary',
  buttonSize = 'md',
  featureSize = 'md',
  className,
  gradient = 'from-purple-50 to-purple-100'
}: FeaturedToolProps) {
  return (
    <div className={twMerge(
      'bg-gradient-to-br rounded-2xl p-8 md:p-12',
      gradient,
      className
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className={twMerge(
            'text-2xl font-bold mb-4',
            titleColor
          )}>
            {title}
          </h3>
          <p className={twMerge(
            'text-lg mb-6',
            descriptionColor
          )}>
            {description}
          </p>
          <LinkButton
            href={buttonHref}
            variant={buttonVariant}
            size={buttonSize}
            showArrow
          >
            {buttonText}
          </LinkButton>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <CheckmarkFeatureList 
            features={features}
            size={featureSize}
            iconColor="text-green-500"
            iconBgColor="bg-green-100"
            titleColor={titleColor}
            descriptionColor={descriptionColor}
          />
        </div>
      </div>
    </div>
  );
} 