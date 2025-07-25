'use client';

import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface LoadMoreProps {
  onLoadMore: () => void;
  isVisible?: boolean;
  className?: string;
}

export default function LoadMore({
  onLoadMore,
  isVisible = true,
  className
}: LoadMoreProps) {
  if (!isVisible) return null;

  return (
    <div className={twMerge('text-center', className)}>
      <Button
        variant="subtle"
        onClick={onLoadMore}
        size="lg"
      >
        Load More
      </Button>
    </div>
  );
} 