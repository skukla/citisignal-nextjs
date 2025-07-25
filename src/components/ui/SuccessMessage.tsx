'use client';

import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

interface SuccessMessageProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  iconColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonColor?: string;
  className?: string;
}

export default function SuccessMessage({
  title,
  description,
  buttonText,
  onButtonClick,
  iconColor = 'text-green-600',
  titleColor = 'text-gray-900',
  descriptionColor = 'text-gray-600',
  buttonColor = 'text-purple-600 hover:text-purple-700',
  className
}: SuccessMessageProps) {
  return (
    <div className={twMerge('text-center', className)}>
      <CheckCircleIcon className={twMerge('w-16 h-16 mx-auto mb-6', iconColor)} />
      <h2 className={twMerge('text-3xl font-bold mb-4', titleColor)}>
        {title}
      </h2>
      <p className={twMerge('text-xl mb-8', descriptionColor)}>
        {description}
      </p>
      <button
        onClick={onButtonClick}
        className={twMerge('font-medium', buttonColor)}
      >
        {buttonText}
      </button>
    </div>
  );
} 