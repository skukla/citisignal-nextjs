import { BaseComponentProps } from './ui';
import { CSSProperties } from 'react';

export interface SectionProps extends BaseComponentProps {
  background?: string;
  gradient?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  style?: CSSProperties;
}