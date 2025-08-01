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
  className?: string;
}

/**
 * A container component for displaying a sequence of process steps.
 * Renders steps in a responsive grid with optional connector lines.
 * 
 * @example
 * ```tsx
 * const steps = [
 *   {
 *     icon: PhoneIcon,
 *     title: 'Choose Your Device',
 *     description: 'Select from our wide range of smartphones.',
 *     details: ['Latest models', 'Trade-in available']
 *   }
 * ];
 * 
 * <ProcessSteps steps={steps} showConnectors={true} />
 * ```
 */
export default function ProcessSteps({
  steps,
  showConnectors = true,
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
        />
      ))}
    </div>
  );
} 