import { ComponentType, ReactNode } from 'react';
import { BaseComponentProps } from './ui';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends BaseComponentProps {
  children?: ReactNode;
  size?: BadgeSize;
  pill?: boolean;
  icon?: ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  showDot?: boolean;
  dotColor?: string;
}