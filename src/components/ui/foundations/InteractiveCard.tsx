import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../cards/Card';

export interface InteractiveCardProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  as?: 'div' | 'button' | 'a';
  variant?: 'default' | 'bordered' | 'elevated';
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  className?: string;
  disabled?: boolean;
}

export default function InteractiveCard({
  children,
  onClick,
  href,
  as = 'div',
  variant = 'default',
  hoverEffect = 'lift',
  className,
  disabled = false
}: InteractiveCardProps) {
  const hoverEffects = {
    lift: 'hover:shadow-lg hover:-translate-y-1',
    glow: 'hover:shadow-xl hover:shadow-citisignal-primary/20',
    scale: 'hover:scale-105',
    none: ''
  };

  const interactiveClasses = twMerge(
    'transition-all duration-200 cursor-pointer',
    !disabled && hoverEffects[hoverEffect],
    disabled && 'opacity-50 cursor-not-allowed',
    onClick && 'focus:outline-none focus:ring-2 focus:ring-citisignal-primary focus:ring-offset-2'
  );

  const cardProps = {
    className: twMerge(interactiveClasses, className),
    variant,
    ...(as === 'button' && { 
      type: 'button' as const,
      disabled,
      onClick: disabled ? undefined : onClick 
    }),
    ...(as === 'a' && href && { href }),
    ...(as === 'div' && onClick && { 
      onClick: disabled ? undefined : onClick,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      },
      tabIndex: disabled ? -1 : 0,
      role: 'button'
    })
  };

  return (
    <Card as={as} {...cardProps}>
      {children}
    </Card>
  );
}