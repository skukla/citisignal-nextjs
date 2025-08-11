import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';
import { CheckIcon } from '@heroicons/react/24/solid';
import IconContainer from './IconContainer';

export interface FeatureItemProps {
  icon?: ComponentType<{ className?: string }>;
  iconVariant?: 'check' | 'custom';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FeatureItem({
  icon: CustomIcon,
  iconVariant = 'check',
  title,
  description,
  children,
  layout = 'horizontal',
  size = 'md',
  className
}: FeatureItemProps) {
  const Icon = iconVariant === 'check' ? CheckIcon : CustomIcon;
  
  const sizeStyles = {
    sm: {
      icon: 'sm',
      title: 'text-sm font-medium',
      description: 'text-xs text-gray-600',
      spacing: 'gap-2'
    },
    md: {
      icon: 'md',
      title: 'text-base font-medium',
      description: 'text-sm text-gray-600',
      spacing: 'gap-3'
    },
    lg: {
      icon: 'lg',
      title: 'text-lg font-semibold',
      description: 'text-base text-gray-600',
      spacing: 'gap-4'
    }
  };

  const layoutClasses = layout === 'vertical' 
    ? 'flex-col items-center text-center'
    : 'flex-row items-start';

  const styles = sizeStyles[size];

  if (children) {
    return (
      <div className={twMerge(
        'flex',
        layoutClasses,
        styles.spacing,
        className
      )}>
        {Icon && (
          <IconContainer 
            icon={Icon}
            size={styles.icon as 'sm' | 'md' | 'lg'}
            variant={iconVariant === 'check' ? 'primary' : 'secondary'}
          />
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge(
      'flex',
      layoutClasses,
      styles.spacing,
      className
    )}>
      {Icon && (
        <IconContainer 
          icon={Icon}
          size={styles.icon as 'sm' | 'md' | 'lg'}
          variant={iconVariant === 'check' ? 'primary' : 'secondary'}
        />
      )}
      <div className="flex-1">
        {title && (
          <h3 className={styles.title}>
            {title}
          </h3>
        )}
        {description && (
          <p className={styles.description}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}