import { useRef, useEffect, useState } from 'react';

interface PageLoadingState {
  productsLoading: boolean;
  facetsLoading: boolean;
  searchQuery?: string;
}

/**
 * Single source of truth for page-level loading state.
 * Returns true when coordinated skeletons should be shown.
 * 
 * Shows skeletons for:
 * - Initial page load (until both queries complete)
 * - Search changes (until both queries complete)
 * - Not for filter changes (handled individually)
 */
export function usePageLoading({
  productsLoading,
  facetsLoading,
  searchQuery
}: PageLoadingState): boolean {
  const initialLoadComplete = useRef(false);
  const lastSearchQuery = useRef(searchQuery);
  const [isInSearchTransition, setIsInSearchTransition] = useState(false);
  
  // Mark initial load complete when both queries finish
  useEffect(() => {
    if (!productsLoading && !facetsLoading) {
      if (!initialLoadComplete.current) {
        initialLoadComplete.current = true;
      }
      // Clear search transition when both queries complete
      if (isInSearchTransition) {
        setIsInSearchTransition(false);
      }
    }
  }, [productsLoading, facetsLoading, isInSearchTransition]);
  
  // Detect search changes and start transition
  useEffect(() => {
    if (searchQuery !== lastSearchQuery.current) {
      lastSearchQuery.current = searchQuery;
      // Only set search transition if we've already loaded initially
      if (initialLoadComplete.current) {
        setIsInSearchTransition(true);
      }
    }
  }, [searchQuery]);
  
  // Show loading for initial load or during search transition
  const isInitialLoad = !initialLoadComplete.current && (productsLoading || facetsLoading);
  const isSearching = isInSearchTransition && (productsLoading || facetsLoading);
  
  return isInitialLoad || isSearching;
}