'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UsePanelReturn } from '@/hooks/usePanel';

/**
 * Navigation-specific panel hook following the composition pattern.
 * Provides clean separation between panel logic and navigation business logic.
 */
export function useNavigationPanel(): UsePanelReturn {
  return usePanel();
}