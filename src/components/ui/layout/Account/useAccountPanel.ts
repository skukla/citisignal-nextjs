'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UsePanelReturn } from '@/hooks/usePanel';

/**
 * Account-specific panel hook following the composition pattern.
 * Provides clean separation between panel logic and account business logic.
 */
export function useAccountPanel(): UsePanelReturn {
  return usePanel();
}