'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/foundations/Button';
import type { SearchTriggerProps } from './Search.types';
import { useSearchContext } from './SearchRoot';

/**
 * Trigger button for opening the search panel.
 * Uses the Button component with ghost variant for consistency.
 *
 * @example
 * <Search.Trigger aria-label="Search products" />
 */
export function SearchTrigger({ ...props }: SearchTriggerProps) {
  const { toggle } = useSearchContext();

  return (
    <Button
      variant="ghost"
      size="sm"
      leftIcon={MagnifyingGlassIcon}
      onClick={toggle}
      className="focus:ring-0 focus:ring-offset-0"
      aria-label="Search products"
      {...props}
    />
  );
}