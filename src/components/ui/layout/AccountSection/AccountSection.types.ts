import { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types/ui';

export interface AccountSectionHeaderProps extends BaseComponentProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export interface AccountSectionContentProps extends BaseComponentProps {
  children: ReactNode;
}

export interface AccountSectionProps extends BaseComponentProps {
  children: ReactNode;
}
