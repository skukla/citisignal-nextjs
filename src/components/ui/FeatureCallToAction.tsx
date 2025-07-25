'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface Feature {
  text: string;
  icon?: ElementType;
}

interface FeatureCallToActionProps {
  title: string;
  description: string;
  features?: Feature[];
  buttonText: string;
  buttonAction?: () => void;
  supportText?: string;
  supportPhone?: string;
  gradient?: string;
  buttonColor?: string;
  iconColor?: string;
  className?: string;
}

export default function FeatureCallToAction({
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
}: FeatureCallToActionProps) {
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
                <li key={index} className="flex items-center">
                  {feature.icon && (
                    <feature.icon className={`w-5 h-5 ${iconColor} mr-3`} />
                  )}
                  {feature.text}
                </li>
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
            {(supportText || supportPhone) && (
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-500">
                  {supportText}
                  {supportPhone && (
                    <span className="font-medium text-gray-900">
                      {supportText ? ' ' : ''}{supportPhone}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 