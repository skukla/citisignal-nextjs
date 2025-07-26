'use client';

import { ElementType, MouseEvent } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { ButtonVariant, ButtonSize } from '@/types/theme';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  customColor?: string;
}

const sizeClasses: Record<ButtonSize, { base: string; link: string }> = {
  sm: { base: 'px-4 py-2 text-sm', link: 'text-sm' },
  md: { base: 'px-6 py-3 text-base', link: 'text-base' },
  lg: { base: 'px-8 py-4 text-lg', link: 'text-lg' }
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#8821f4] text-white shadow-lg hover:shadow-xl hover:opacity-80',
  secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
  yellow: 'bg-yellow-400 text-gray-900 font-bold shadow-lg hover:shadow-xl hover:bg-yellow-300',
  ghost: 'hover:bg-gray-100',
  subtle: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-0',
  'white-outline': 'border-2 border-white text-white hover:bg-white hover:text-purple-600',
  'light-subtle': 'bg-white text-gray-700 hover:bg-gray-100 border-0 shadow-sm hover:shadow-md',
  link: 'text-purple-600 hover:text-purple-700 p-0'
};

const iconClasses = {
  base: 'w-5 h-5',
  link: 'w-4 h-4'
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  href,
  loading = false,
  disabled = false,
  onClick,
  className,
  customColor
}: ButtonProps) {
  const styles = twMerge(
    // Base
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full',
    'cursor-pointer',
    
    // Size & Shape
    variant !== 'link' && 'rounded-lg',
    variant === 'link' ? sizeClasses[size].link : sizeClasses[size].base,
    
    // Variant
    !customColor && variantClasses[variant],
    
    // Custom color override for primary variant
    variant === 'primary' && customColor && 'text-white shadow-lg hover:shadow-xl hover:opacity-80',
    
    className
  );

  const content = (
    <>
      {loading ? (
        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className={twMerge(
            iconClasses.base,
            variant === 'link' && iconClasses.link
          )} />}
          {children}
          {RightIcon && <RightIcon className={twMerge(
            iconClasses.base,
            variant === 'link' && iconClasses.link
          )} />}
        </>
      )}
    </>
  );

  const buttonStyle = customColor && variant === 'primary' ? { backgroundColor: customColor } : undefined;

  if (href) {
    return (
      <Link href={href} className={styles} style={buttonStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={styles}
      style={buttonStyle}
    >
      {content}
    </button>
  );
} 