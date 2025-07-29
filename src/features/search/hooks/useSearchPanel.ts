'use client';

import { usePanel } from '@/hooks/usePanel';
import type { UseSearchPanelReturn } from '../types/search.types';

export function useSearchPanel(): UseSearchPanelReturn {
  return usePanel();
} 