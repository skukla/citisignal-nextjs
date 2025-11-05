/**
 * Type definitions for ProductPage components
 */

import type { BreadcrumbItem } from '@/types/layout';
import type { FilterSection } from '@/components/ui/search/FilterSidebar/FilterSidebar.types';

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
  filters: FilterSection[]; // Filter configuration - accepts FilterSection format
  emptyState: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    actionLabel: string;
  };
  loadingSkeletonCount?: number;
}
