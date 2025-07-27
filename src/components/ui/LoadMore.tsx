'use client';

import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { ButtonVariant, ButtonSize } from '@/types/theme';

interface LoadMoreProps {
  onLoadMore: () => void;
  text?: string;
  isVisible?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  containerClassName?: string;
}

export default function LoadMore({
  onLoadMore,
  text = 'Load More',
  isVisible = true,
  isLoading = false,
  variant = 'subtle',
  size = 'lg',
  className,
  containerClassName
}: LoadMoreProps) {
  if (!isVisible) return null;

  return (
    <div className={twMerge('text-center', containerClassName)}>
      <Button
        variant={variant}
        onClick={onLoadMore}
        size={size}
        loading={isLoading}
        className={className}
      >
        {text}
      </Button>
    </div>
  );
} 