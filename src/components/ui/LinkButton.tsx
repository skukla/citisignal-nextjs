'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import type { LinkButtonVariant, ButtonSize } from '@/types/theme';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: LinkButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  className?: string;
  containerClassName?: string;
}

export default function LinkButton({
  href,
  children,
  variant = 'primary',
  size = 'lg',
  showArrow = false,
  leftIcon,
  rightIcon,
  className,
  containerClassName
}: LinkButtonProps) {
  // If showArrow is true and no rightIcon is provided, use ArrowRightIcon
  const finalRightIcon = showArrow && !rightIcon ? ArrowRightIcon : rightIcon;

  if (containerClassName) {
    return (
      <div className={containerClassName}>
        <Button
          href={href}
          variant={variant}
          size={size}
          leftIcon={leftIcon}
          rightIcon={finalRightIcon}
          className={className}
        >
          {children}
        </Button>
      </div>
    );
  }

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      leftIcon={leftIcon}
      rightIcon={finalRightIcon}
      className={className}
    >
      {children}
    </Button>
  );
} 