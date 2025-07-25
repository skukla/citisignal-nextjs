'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import ProcessStep from './ProcessStep';

interface Step {
  icon: ElementType;
  title: string;
  description: string;
  details?: string[];
}

interface ProcessStepsProps {
  steps: Step[];
  showConnectors?: boolean;
  iconColor?: string;
  className?: string;
}

export default function ProcessSteps({
  steps,
  showConnectors = true,
  iconColor = '#8821f4',
  className
}: ProcessStepsProps) {
  const containerClasses = twMerge(
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16',
    className
  );

  return (
    <div className={containerClasses}>
      {steps.map((step, index) => (
        <ProcessStep
          key={index}
          icon={step.icon}
          stepNumber={index + 1}
          title={step.title}
          description={step.description}
          details={step.details}
          showConnector={showConnectors && index < steps.length - 1}
          iconColor={iconColor}
        />
      ))}
    </div>
  );
} 