import { ElementType } from 'react';
import type { BaseComponentProps } from './ui';

/**
 * Props for the StatsCard component
 */
export interface StatsCardProps extends BaseComponentProps {
  icon: ElementType;
  title: string;
  variant?: 'default' | 'purple' | 'blue' | 'green';
  children: React.ReactNode;
}