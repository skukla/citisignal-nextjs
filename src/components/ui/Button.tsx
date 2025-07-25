'use client';

import { ElementType } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'ghost' | 'subtle' | 'white-outline' | 'light-subtle';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  customColor?: string;
}

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
    'rounded-lg font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full',
    'cursor-pointer',
    
    // Sizes
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3',
    size === 'lg' && 'px-8 py-4 text-lg',
    
    // Variants
    variant === 'primary' && !customColor && 'bg-[#8821f4] text-white shadow-lg hover:shadow-xl hover:opacity-80',
    variant === 'secondary' && 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    variant === 'outline' && 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    variant === 'yellow' && 'bg-yellow-400 text-gray-900 font-bold shadow-lg hover:shadow-xl hover:bg-yellow-300',
    variant === 'ghost' && 'hover:bg-gray-100',
    variant === 'subtle' && 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-0',
    variant === 'white-outline' && 'border-2 border-white text-white hover:bg-white hover:text-purple-600',
    variant === 'light-subtle' && 'bg-white text-gray-700 hover:bg-gray-100 border-0 shadow-sm hover:shadow-md',
    
    // Custom color styles
    variant === 'primary' && customColor && 'text-white shadow-lg hover:shadow-xl hover:opacity-80',
    
    className
  );

  const content = (
    <>
      {loading ? (
        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-5 h-5" />}
          {children}
          {RightIcon && <RightIcon className="w-5 h-5" />}
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