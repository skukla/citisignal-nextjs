'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LinkButtonProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
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
  const variantClasses = {
    primary: 'text-white hover:opacity-90',
    secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  };

  return (
    <div className={twMerge(
      centered && 'text-center',
      className
    )}>
      <Link
        href={href}
        className={twMerge(
          'inline-flex items-center font-medium rounded-lg transition-colors',
          variantClasses[variant],
          sizeClasses[size],
          variant === 'primary' && 'bg-[#8821f4]'
        )}
      >
        {text}
        {showArrow && <ArrowRightIcon className="w-5 h-5 ml-2" />}
      </Link>
    </div>
  );
} 