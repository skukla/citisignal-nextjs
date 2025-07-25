'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface LinkButtonProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'ghost' | 'subtle' | 'white-outline';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  centered?: boolean;
  className?: string;
}

export default function LinkButton({
  href,
  text,
  variant = 'primary',
  size = 'lg',
  showArrow = false,
  centered = false,
  className
}: LinkButtonProps) {
  return (
    <div className={twMerge(
      centered && 'text-center',
      className
    )}>
      <Button
        href={href}
        variant={variant}
        size={size}
        rightIcon={showArrow ? ArrowRightIcon : undefined}
      >
        {text}
      </Button>
    </div>
  );
} 