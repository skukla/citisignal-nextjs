import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconButtonProps {
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
  'aria-label': string;
  variant?: 'default' | 'danger';
  className?: string;
}

export default function IconButton({
  icon: Icon,
  onClick,
  'aria-label': ariaLabel,
  variant = 'default',
  className
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={twMerge(
        'p-2 rounded-full transition-colors',
        variant === 'default' 
          ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100' 
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50',
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}