import { ElementType, ReactNode } from 'react';

/**
 * Size variants for headers
 */
export type HeaderSize = 'sm' | 'md' | 'lg';

/**
 * Props for the PageHeader component
 */
export interface PageHeaderProps {
  title: string;
  description?: string;
  icon: ElementType;
  actions?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Props for the SectionHeader component
 */
export interface SectionHeaderProps {
  title: string;
  description?: string;
  size?: HeaderSize;
  centered?: boolean;
  className?: string;
  'aria-level'?: number;
}