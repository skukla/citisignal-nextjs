import { useRef, useEffect, useState } from 'react';

interface PageLoadingState {
  productsLoading: boolean;
  facetsLoading: boolean;
  searchQuery?: string;
  sortBy?: string;
  activeFilters?: Record<string, string[] | boolean | undefined>;
}

/**
 * Single source of truth for page-level loading state.
 * Returns true when coordinated skeletons should be shown.
 *
 * Shows skeletons for:
 * - Initial page load (until both queries complete)
 * - Search changes (until both queries complete)
 * - Sort changes (until both queries complete)
 * - Filter changes (until both queries complete)
 */
export function usePageLoading({
  productsLoading,
  facetsLoading,
  searchQuery,
  sortBy,
  activeFilters,
}: PageLoadingState) {
  const initialLoadComplete = useRef(false);
  const lastSearchQuery = useRef(searchQuery);
  const lastSortBy = useRef(sortBy);
  const lastActiveFilters = useRef(activeFilters);
  const [isInSearchTransition, setIsInSearchTransition] = useState(false);
  const [isInSortTransition, setIsInSortTransition] = useState(false);
  const [isInFilterTransition, setIsInFilterTransition] = useState(false);

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
      if (isInFilterTransition) {
        setIsInFilterTransition(false);
      }
    }
  }, [
    productsLoading,
    facetsLoading,
    isInSearchTransition,
    isInSortTransition,
    isInFilterTransition,
  ]);

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

  // Detect filter changes and start transition
  useEffect(() => {
    const activeFiltersString = JSON.stringify(activeFilters || {});
    const lastActiveFiltersString = JSON.stringify(lastActiveFilters.current || {});

    if (activeFiltersString !== lastActiveFiltersString) {
      lastActiveFilters.current = activeFilters;
      // Only set filter transition if we've already loaded initially
      if (initialLoadComplete.current) {
        setIsInFilterTransition(true);
      }
    }
  }, [activeFilters]);

  // Show loading for initial load, search, sort, or filter transitions
  const isInitialLoad = !initialLoadComplete.current && (productsLoading || facetsLoading);
  const isSearching = isInSearchTransition && (productsLoading || facetsLoading);
  const isSorting = isInSortTransition && (productsLoading || facetsLoading);
  const isFiltering = isInFilterTransition && (productsLoading || facetsLoading);

  return {
    isInitialLoad,
    isPageTransition: isInitialLoad || isSearching || isSorting || isFiltering,
  };
}
