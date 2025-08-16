/**
 * Type definitions for ProductPage components
 */

import type { BreadcrumbItem } from '@/types/layout';

export interface PageData {
  breadcrumbs: BreadcrumbItem[];
  pageHeader: {
    title: string;
    description: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  search: {
    placeholder: string;
    itemLabel: string;
  };
  filters: any[]; // Filter configuration
  emptyState: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    actionLabel: string;
  };
  loadingSkeletonCount?: number;
}