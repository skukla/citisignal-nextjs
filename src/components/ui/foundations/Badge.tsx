'use client';

import { twMerge } from 'tailwind-merge';
import type { BadgeProps } from '@/types/badge';

/**
 * Badge component for displaying status, labels, counters, or icons.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 * 
 * // With custom style
 * <Badge className="bg-green-500 text-white">Success</Badge>
 * 
 * // With icon component
 * <Badge icon={StarIcon}>Featured</Badge>
 * 
 * // Icon-only badge (IconBadge style)
 * <Badge 
 *   icon={StarIcon} 
 *   className="w-12 h-12 bg-purple-50 text-purple-600" 
 * />
 * 
 * // With dot
 * <Badge showDot dotColor="bg-yellow-400">Premium</Badge>
 * ```
 */
export default function Badge({
  children,
  size = 'md',
  pill = false,
  icon: Icon,
  iconPosition = 'left',
  showDot,
  dotColor = 'bg-current',
  className
}: BadgeProps) {
  const isIconOnly = !children && Icon;
  
  const classes = twMerge(
    'inline-flex items-center justify-center font-medium',
    
    // Size variants
    size === 'sm' && 'text-xs px-2 py-0.5 gap-1',
    size === 'md' && 'text-sm px-2.5 py-1 gap-1.5',
    size === 'lg' && 'text-base px-3 py-1.5 gap-2',
    
    // Shape
    (pill || isIconOnly) ? 'rounded-full' : 'rounded',
    
    // Default style (can be overridden by className)
    'bg-gray-100 text-gray-700',
    
    className
  );

  const iconSize = isIconOnly ? 'w-6 h-6' : 'w-4 h-4';

  return (
    <span className={classes}>
      {/* Left icon */}
      {Icon && !isIconOnly && iconPosition === 'left' && (
        <Icon className={iconSize} aria-hidden />
      )}
      
      {/* Dot indicator */}
      {showDot && (
        <span 
          className={twMerge('rounded-full w-2 h-2', dotColor)}
          aria-hidden
        />
      )}
      
      {/* Content or icon-only */}
      {isIconOnly && Icon ? (
        <Icon className={iconSize} aria-hidden />
      ) : (
        children
      )}
      
      {/* Right icon */}
      {Icon && !isIconOnly && iconPosition === 'right' && (
        <Icon className={iconSize} aria-hidden />
      )}
    </span>
  );
}