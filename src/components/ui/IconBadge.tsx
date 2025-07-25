'use client';

import { twMerge } from 'tailwind-merge';

interface IconBadgeProps {
  icon?: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
}

export default function IconBadge({
  icon,
  bgColor = 'bg-purple-50',
  iconColor = 'text-purple-600',
  size = 'md',
  opacity = 100,
  className
}: IconBadgeProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <div className={twMerge(
      'rounded-full flex items-center justify-center',
      sizeClasses[size],
      bgColor,
      opacity < 100 && `bg-opacity-${opacity}`,
      className
    )}>
      {icon && (
        <div className={twMerge(
          iconSizeClasses[size],
          iconColor,
          'flex items-center justify-center'
        )}>
          {icon}
        </div>
      )}
    </div>
  );
} 