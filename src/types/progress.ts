import { BaseComponentProps } from './ui';

export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends BaseComponentProps {
  label: string;
  value: number;
  showValue?: boolean;
  size?: ProgressSize;
}