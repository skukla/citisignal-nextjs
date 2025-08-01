import { ElementType } from 'react';
import { BaseComponentProps } from './ui';

export interface Feature {
  text: string;
  icon?: ElementType;
}

export interface FeatureListProps extends BaseComponentProps {
  features: Feature[];
  iconColor?: string;
}

export interface CallToActionProps extends BaseComponentProps {
  title: string;
  description: string;
  features?: Feature[];
  buttonText: string;
  buttonHref: string;
  supportText?: string;
  supportPhone?: string;
  gradient?: string;
}