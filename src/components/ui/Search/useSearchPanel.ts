'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UsePanelReturn } from '@/hooks/usePanel';

export function useSearchPanel(): UsePanelReturn {
  return usePanel();
} 