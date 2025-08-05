'use client';

import { ReactNode } from 'react';
import PageHeader from '@/components/ui/layout/PageHeader';
import type { HeroIcon } from '@/types/hero-icons';

export interface PageHeaderSectionProps {
  title: string;
  description?: string;
  icon: HeroIcon;
  actions?: ReactNode;
}

/**
 * Page header section with consistent spacing.
 * Wraps the base PageHeader component with proper structure.
 * 
 * @example
 * <PageHeaderSection 
 *   title="Wireless Plans"
 *   description="Choose the perfect plan..."
 *   icon={SignalIcon}
 * />
 */
export default function PageHeaderSection({ 
  title, 
  description, 
  icon, 
  actions 
}: PageHeaderSectionProps) {
  return (
    <PageHeader
      title={title}
      description={description}
      icon={icon}
      actions={actions}
    />
  );
}