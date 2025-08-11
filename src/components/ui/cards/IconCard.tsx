import { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import IconContainer from '../foundations/IconContainer';
import FeatureItem from '../foundations/FeatureItem';

export interface IconCardProps {
  icon?: ComponentType<{ className?: string }>;
  emoji?: string;
  title: string;
  description: string;
  features?: string[];
  href?: string;
  onClick?: () => void;
  iconVariant?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
  iconColor?: string;
  iconBgColor?: string;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'vertical' | 'horizontal';
  interactive?: boolean;
  stats?: { value: string; label: string }[];
  className?: string;
}

export default function IconCard({
  icon,
  emoji,
  title,
  description,
  features,
  href,
  onClick,
  iconVariant = 'default',
  iconColor,
  iconBgColor,
  iconSize = 'lg',
  layout = 'vertical',
  interactive = false,
  stats,
  className
}: IconCardProps) {
  const isClickable = !!(href || onClick || interactive);
  
  const cardProps = {
    ...(href && { as: 'a' as const, href }),
    ...(onClick && !href && { 
      as: 'button' as const, 
      onClick,
      type: 'button' as const
    }),
    className: twMerge(
      'h-full',
      isClickable && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
      layout === 'horizontal' && 'flex items-start gap-4',
      className
    )
  };

  const iconVariantToUse = iconColor || iconBgColor ? 'custom' : iconVariant;

  return (
    <Card {...cardProps}>
      <div className={twMerge(
        'p-6',
        layout === 'vertical' && 'text-center',
        layout === 'horizontal' && 'flex-1'
      )}>
        {/* Icon or Emoji */}
        {(icon || emoji) && (
          <div className={twMerge(
            layout === 'vertical' && 'mb-4 flex justify-center',
            layout === 'horizontal' && 'mb-0 flex-shrink-0'
          )}>
            {emoji ? (
              <div className={twMerge(
                'flex items-center justify-center rounded-full',
                iconSize === 'sm' && 'w-8 h-8 text-lg',
                iconSize === 'md' && 'w-12 h-12 text-2xl',
                iconSize === 'lg' && 'w-16 h-16 text-3xl',
                iconSize === 'xl' && 'w-20 h-20 text-4xl'
              )}>
                {emoji}
              </div>
            ) : icon && (
              <IconContainer 
                icon={icon}
                size={iconSize}
                variant={iconVariantToUse}
                {...(iconColor || iconBgColor ? {
                  bgColor: iconBgColor,
                  className: iconColor
                } : {})}
              />
            )}
          </div>
        )}

        <div className={layout === 'horizontal' ? 'flex-1' : ''}>
          {/* Title */}
          <h3 className={twMerge(
            'font-semibold text-gray-900 mb-2',
            iconSize === 'sm' ? 'text-sm' : iconSize === 'md' ? 'text-base' : 'text-lg'
          )}>
            {title}
          </h3>

          {/* Description */}
          <p className={twMerge(
            'text-gray-600 mb-4',
            iconSize === 'sm' ? 'text-xs' : iconSize === 'md' ? 'text-sm' : 'text-base'
          )}>
            {description}
          </p>

          {/* Stats (for StatsCard pattern) */}
          {stats && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-citisignal-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features (for SolutionCard pattern) */}
          {features && features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  iconVariant="check"
                  size="sm"
                  layout="horizontal"
                  className="justify-start text-left"
                >
                  <span className="text-sm text-gray-700">{feature}</span>
                </FeatureItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}