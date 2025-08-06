'use client';

import { twMerge } from 'tailwind-merge';
import { useCheckoutContext } from './CheckoutContext';
import type { CheckoutHeaderProps } from './types';

export function CheckoutHeader({
  title = 'Checkout',
  className
}: CheckoutHeaderProps) {
  const { steps, currentStep, isStepComplete } = useCheckoutContext();

  return (
    <header className={twMerge('mb-8', className)}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step) => {
            const isCurrent = currentStep === step.id;
            const isComplete = isStepComplete(step.id);

            return (
              <li key={step.id} className="md:flex-1">
                <div className={twMerge(
                  'group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0',
                  isCurrent ? 'border-purple-600' : isComplete ? 'border-green-600' : 'border-gray-200'
                )}>
                  <span className={twMerge(
                    'text-base font-semibold',
                    isCurrent ? 'text-purple-600' : isComplete ? 'text-green-600' : 'text-gray-600'
                  )}>
                    {step.title}
                  </span>
                  <span className="text-sm text-gray-600">{step.description}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}