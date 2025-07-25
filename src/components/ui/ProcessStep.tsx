'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProcessStepProps {
  icon: ElementType;
  stepNumber: number;
  title: string;
  description: string;
  details?: string[];
  showConnector?: boolean;
  iconColor?: string;
  className?: string;
}

export default function ProcessStep({
  icon: Icon,
  stepNumber,
  title,
  description,
  details = [],
  showConnector = false,
  iconColor = '#8821f4',
  className
}: ProcessStepProps) {
  const containerClasses = twMerge(
    'relative',
    className
  );

  return (
    <div className={containerClasses}>
      {/* Connection Line - Hidden on mobile */}
      {showConnector && (
        <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-200 transform translate-x-4 -translate-y-1/2" />
      )}
      
      {/* Step Card */}
      <div className="text-center">
        {/* Icon Circle */}
        <div
          className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: iconColor }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Step Number */}
        <div className="text-sm font-bold text-purple-600 mb-2">
          STEP {stepNumber}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        {/* Details */}
        {details.length > 0 && (
          <ul className="text-sm text-gray-500 space-y-1">
            {details.map((detail, index) => (
              <li key={index} className="flex items-center justify-center">
                <div className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 