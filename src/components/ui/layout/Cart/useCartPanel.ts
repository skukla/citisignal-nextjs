'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UsePanelReturn } from '@/hooks/usePanel';

/**
 * Cart-specific panel hook following the composition pattern.
 * Provides clean separation between panel logic and cart business logic.
 */
export function useCartPanel(): UsePanelReturn {
  return usePanel();
}