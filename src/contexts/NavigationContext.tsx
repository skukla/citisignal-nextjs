'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useRef } from 'react';
import { useDemoInspector } from './DemoInspectorContext';

// Navigation data structure matching our API
export interface NavigationData {
  headerNav: Array<{
    href: string;
    label: string;
    category: string;
  }>;
  footerNav: Array<{
    href: string;
    label: string;
  }>;
}

export interface BreadcrumbData {
  items: Array<{
    name: string;
    urlPath: string;
  }>;
}

interface NavigationContextValue {
  // Navigation data
  navigation: NavigationData | null;
  breadcrumbs: BreadcrumbData | null;
  
  // Setters for updating data
  setNavigation: (data: NavigationData | null) => void;
  setBreadcrumbs: (data: BreadcrumbData | null) => void;
  
  // Loading state
  isLoadingFromUnified: boolean;
  setIsLoadingFromUnified: (loading: boolean) => void;
  
  // Metadata
  lastUpdated: number | null;
  source: 'unified' | 'standalone' | 'cache' | null;
  
  // Helper to check if data is stale (older than 5 minutes)
  isStale: () => boolean;
  
  // Cache management
  clearCache: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

const CACHE_KEY = 'citisignal_navigation_cache';
const CACHE_DISABLED_KEY = 'citisignal_cache_disabled';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface NavigationProviderProps {
  children: ReactNode;
  initialNavigation?: NavigationData;
  initialBreadcrumbs?: BreadcrumbData;
}

export function NavigationProvider({ 
  children, 
  initialNavigation,
  initialBreadcrumbs 
}: NavigationProviderProps) {
  const { singleQueryMode } = useDemoInspector();
  const hasStartedUnifiedQuery = useRef(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const [navigation, setNavigationState] = useState<NavigationData | null>(null);
  const [breadcrumbs, setBreadcrumbsState] = useState<BreadcrumbData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [source, setSource] = useState<'unified' | 'standalone' | 'cache' | null>(null);
  
  // During SSR and initial hydration, block queries to prevent race conditions
  // We'll determine the actual state after hydration completes
  const [isLoadingFromUnified, setIsLoadingFromUnifiedState] = useState(true);
  
  // Mark as hydrated after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Track if unified query actually started - if not, release the lock after a timeout
  useEffect(() => {
    // Wait for hydration to complete before making decisions
    if (!isHydrated) return;
    
    if (singleQueryMode) {
      // Reset the flag when mode changes
      hasStartedUnifiedQuery.current = false;
      setIsLoadingFromUnifiedState(true);
      
      // Give the page 100ms to start a unified query
      const timeout = setTimeout(() => {
        if (!hasStartedUnifiedQuery.current) {
          // No unified query started, allow standalone queries
          setIsLoadingFromUnifiedState(false);
        }
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // Not in single query mode, allow standalone queries
      hasStartedUnifiedQuery.current = false;
      setIsLoadingFromUnifiedState(false);
    }
  }, [singleQueryMode, isHydrated]);
  
  // Enhanced setter that tracks if unified query actually started
  const setIsLoadingFromUnified = useCallback((loading: boolean) => {
    if (loading) {
      hasStartedUnifiedQuery.current = true;
    }
    setIsLoadingFromUnifiedState(loading);
  }, []);
  
  // Load from cache on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Use initial data if provided (SSR)
    if (initialNavigation) {
      setNavigationState(initialNavigation);
      setSource('unified');
      setLastUpdated(Date.now());
      return;
    }
    
    // Check if cache is disabled
    const cacheDisabled = localStorage.getItem(CACHE_DISABLED_KEY) === 'true';
    if (cacheDisabled) return;
    
    // Otherwise try cache
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { navigation: cachedNav, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        if (age < CACHE_TTL) {
          setNavigationState(cachedNav);
          setSource('cache');
          setLastUpdated(timestamp);
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
  }, [initialNavigation]);

  // Save to cache when navigation updates
  useEffect(() => {
    if (navigation && typeof window !== 'undefined' && source !== 'cache') {
      // Check if cache is disabled
      const cacheDisabled = localStorage.getItem(CACHE_DISABLED_KEY) === 'true';
      if (!cacheDisabled) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            navigation,
            timestamp: lastUpdated || Date.now()
          }));
        } catch (e) {
          // Ignore cache errors
        }
      }
    }
  }, [navigation, lastUpdated, source]);

  const setNavigation = useCallback((data: NavigationData | null, dataSource: 'unified' | 'standalone' = 'unified') => {
    setNavigationState(data);
    setSource(dataSource);
    setLastUpdated(Date.now());
  }, []);

  const setBreadcrumbs = useCallback((data: BreadcrumbData | null) => {
    setBreadcrumbsState(data);
  }, []);

  const isStale = useCallback(() => {
    if (!lastUpdated) return true;
    return Date.now() - lastUpdated > CACHE_TTL;
  }, [lastUpdated]);
  
  const clearCache = useCallback(() => {
    // Clear localStorage cache
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (e) {
        console.error('Failed to clear navigation cache:', e);
      }
    }
    
    // Clear in-memory state
    setNavigationState(null);
    setBreadcrumbsState(null);
    setLastUpdated(null);
    setSource(null);
    
    // Reset loading state to allow fresh fetches
    setIsLoadingFromUnifiedState(false);
    hasStartedUnifiedQuery.current = false;
  }, []);

  return (
    <NavigationContext.Provider value={{
      navigation,
      breadcrumbs,
      setNavigation,
      setBreadcrumbs,
      isLoadingFromUnified,
      setIsLoadingFromUnified,
      lastUpdated,
      source,
      isStale,
      clearCache
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}