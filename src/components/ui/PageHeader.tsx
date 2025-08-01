'use client';

import { twMerge } from 'tailwind-merge';
import Container from './Container';
import type { PageHeaderProps } from '@/types/header';

/**
 * PageHeader component for consistent page headers across the application.
 * Provides a standardized layout for page title, description, and optional actions.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <PageHeader
 *   title="Products"
 *   description="Browse our latest products"
 *   icon={ShoppingBagIcon}
 * />
 * 
 * // With actions
 * <PageHeader
 *   title="Team Members"
 *   description="Manage your team"
 *   icon={UsersIcon}
 *   actions={
 *     <Button variant="primary">
 *       Add Member
 *     </Button>
 *   }
 * />
 * 
 * // Without description
 * <PageHeader
 *   title="Settings"
 *   icon={CogIcon}
 *   className="mb-12"
 * />
 * ```
 */
export default function PageHeader({
  title,
  description,
  icon: Icon,
  actions,
  className,
  'aria-label': ariaLabel,
}: PageHeaderProps) {
  return (
    <Container as="header" role="banner" aria-label={ariaLabel || title}>
      <div className={twMerge('mb-8', className)}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 text-purple-600" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </Container>
  );
}