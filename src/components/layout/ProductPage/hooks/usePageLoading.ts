import { useRef, useEffect, useState } from 'react';

interface PageLoadingState {
  productsLoading: boolean;
  facetsLoading: boolean;
  searchQuery?: string;
  sortBy?: string;
}

/**
 * Single source of truth for page-level loading state.
 * Returns true when coordinated skeletons should be shown.
 * 
 * Shows skeletons for:
 * - Initial page load (until both queries complete)
 * - Search changes (until both queries complete)
 * - Sort changes (until both queries complete)
 * - Not for filter changes (handled individually)
 */
export function usePageLoading({
  productsLoading,
  facetsLoading,
  searchQuery,
  sortBy
}: PageLoadingState): boolean {
  const initialLoadComplete = useRef(false);
  const lastSearchQuery = useRef(searchQuery);
  const lastSortBy = useRef(sortBy);
  const [isInSearchTransition, setIsInSearchTransition] = useState(false);
  const [isInSortTransition, setIsInSortTransition] = useState(false);
  
  // Mark initial load complete when both queries finish
  useEffect(() => {
    if (!productsLoading && !facetsLoading) {
      if (!initialLoadComplete.current) {
        initialLoadComplete.current = true;
      }
      // Clear transitions when both queries complete
      if (isInSearchTransition) {
        setIsInSearchTransition(false);
      }
      if (isInSortTransition) {
        setIsInSortTransition(false);
      }
    }
  }, [productsLoading, facetsLoading, isInSearchTransition, isInSortTransition]);
  
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
  
  // Detect sort changes and start transition
  useEffect(() => {
    if (sortBy !== lastSortBy.current) {
      lastSortBy.current = sortBy;
      // Only set sort transition if we've already loaded initially
      if (initialLoadComplete.current) {
        setIsInSortTransition(true);
      }
    }
  }, [sortBy]);
  
  // Show loading for initial load, search, or sort transitions
  const isInitialLoad = !initialLoadComplete.current && (productsLoading || facetsLoading);
  const isSearching = isInSearchTransition && (productsLoading || facetsLoading);
  const isSorting = isInSortTransition && (productsLoading || facetsLoading);
  
  return isInitialLoad || isSearching || isSorting;
}