'use client';

import { twMerge } from 'tailwind-merge';
import type { SearchPanelProps } from './Search.types';
import { useSearchContext } from './SearchRoot';

/**
 * Panel component that displays the search interface.
 * Handles positioning and click-outside behavior.
 *
 * @example
 * <Search.Panel>
 *   <Search.Input />
 *   <Search.Results />
 * </Search.Panel>
 */
export function SearchPanel({ children, className }: SearchPanelProps) {
  const { isOpen, panelRef } = useSearchContext();

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={twMerge(
        'absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}