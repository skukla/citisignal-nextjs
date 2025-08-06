'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UsePanelReturn } from '@/hooks/usePanel';

/**
 * Navigation-specific panel hook following the composition pattern.
 * Provides clean separation between panel logic and navigation business logic.
 */
/**
 * Navigation-specific panel hook following the composition pattern.
 * Provides clean separation between panel logic and navigation business logic.
 * @returns {Object} Panel state and refs
 * @example
 * const { isOpen, toggle, panelRef } = useNavigationPanel();
 */
export function useNavigationPanel(): UsePanelReturn {
  return usePanel();
}