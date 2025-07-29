import { BaseItem } from './navigation.types';

export type BreadcrumbItem = BaseItem;

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export interface BreadcrumbLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  srText?: string;
} 