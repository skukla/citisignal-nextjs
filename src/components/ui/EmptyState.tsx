'use client';

import { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={twMerge(
      'text-center py-12',
      className
    )}>
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
} 