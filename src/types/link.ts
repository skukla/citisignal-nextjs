import { ElementType, ReactNode } from 'react';
import { BaseComponentProps } from './ui';

export type LinkVariant = 'text' | 'button' | 'icon';
export type ButtonStyle = 'primary' | 'secondary' | 'outline';

export interface LinkProps extends BaseComponentProps {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  buttonStyle?: ButtonStyle;
  icon?: ElementType;
  iconPosition?: 'left' | 'right';
}