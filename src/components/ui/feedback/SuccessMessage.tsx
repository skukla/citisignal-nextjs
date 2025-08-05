'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';

interface SuccessMessageProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

/**
 * A success message component for displaying positive feedback with an action.
 * Features a check icon, title, description, and action button.
 * 
 * @example
 * ```tsx
 * <SuccessMessage
 *   title="Thanks for subscribing!"
 *   description="You'll receive updates in your inbox."
 *   buttonText="Subscribe another email"
 *   onButtonClick={() => setIsSubmitted(false)}
 * />
 * ```
 */
export default function SuccessMessage({
  title,
  description,
  buttonText,
  onButtonClick,
  className
}: SuccessMessageProps) {
  return (
    <div className={twMerge('text-center', className)}>
      <CheckCircleIcon className="w-16 h-16 mx-auto mb-6 text-green-600" />
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        {title}
      </h2>
      <p className="text-xl mb-8 text-gray-600">
        {description}
      </p>
      <Button
        variant="outline"
        onClick={onButtonClick}
        className="text-purple-600 border-purple-600 hover:bg-purple-50"
      >
        {buttonText}
      </Button>
    </div>
  );
} 