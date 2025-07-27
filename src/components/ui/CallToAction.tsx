'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import FeatureItem from './FeatureItem';
import SupportText from './SupportText';
import type { ThemeGradient, ThemeTextColor } from '@/types/theme';
import type { CallToActionFeature } from '@/types/features';

interface CallToActionProps {
  title: string;
  description: string;
  features?: CallToActionFeature[];
  buttonText: string;
  buttonAction?: () => void;
  supportText?: string;
  supportPhone?: string;
  gradient?: ThemeGradient;
  buttonColor?: string;
  iconColor?: ThemeTextColor;
  className?: string;
}

export default function CallToAction({
  title,
  description,
  features = [],
  buttonText,
  buttonAction,
  supportText,
  supportPhone,
  gradient = 'from-purple-50 to-purple-100',
  buttonColor = '#8821f4',
  iconColor = 'text-green-500',
  className
}: CallToActionProps) {
  const containerClasses = twMerge(
    'bg-gradient-to-r',
    gradient,
    'rounded-2xl p-8 md:p-12',
    className
  );

  return (
    <div className={containerClasses}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {description}
          </p>
          {features.length > 0 && (
            <ul className="space-y-2 text-gray-600">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  text={feature.text}
                  icon={feature.icon}
                  iconColor={iconColor}
                />
              ))}
            </ul>
          )}
        </div>
        
        <div className="text-center lg:text-left">
          <div className="space-y-4">
            <Button
              onClick={buttonAction}
              variant="primary"
              size="lg"
              className="w-full lg:w-auto"
              customColor={buttonColor}
            >
              {buttonText}
            </Button>
            <SupportText
              text={supportText}
              phone={supportPhone}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 