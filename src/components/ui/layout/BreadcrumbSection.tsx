'use client';

import Breadcrumb from '@/components/ui/layout/Breadcrumb';

export interface BreadcrumbSectionProps {
  items: Array<{ name: string; href?: string }>;
}

/**
 * Breadcrumb section with consistent spacing.
 * Wraps the base Breadcrumb component with proper margins.
 * 
 * @example
 * <BreadcrumbSection items={[
 *   { name: 'Shop', href: '/shop' },
 *   { name: 'Plans' }
 * ]} />
 */
export default function BreadcrumbSection({ items }: BreadcrumbSectionProps) {
  return (
    <div className="mb-6">
      <Breadcrumb items={items} />
    </div>
  );
}